import { supabase } from '@/integrations/supabase/client';

export interface QuotationService {
  id: string;
  name: string;
  slug: string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceParameter {
  id: string;
  service_id: string;
  name: string;
  slug: string;
  title?: string | null;
  description?: string | null;
  price_per_sqft?: number;
  is_required: boolean;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  products?: ParameterProduct[];
}

export interface ParameterProduct {
  id: string;
  parameter_id: string;
  name: string;
  slug: string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  price_per_sqft?: number | null;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface QuotationSelectionData {
  parameter_id: string;
  product_id: string;
  parameter_name_snapshot: string;
  product_name_snapshot: string;
  price_per_sqft?: number;
  total_price?: number;
}

export interface QuotationSubmissionPayload {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  project_location: string;
  project_type?: string;
  area_sqft?: string;
  description?: string;
  service_id: string;
  service_name_snapshot: string;
  labour_charge_per_sqft?: number;
  transport_charge_per_sqft?: number;
  total_material_cost?: number;
  total_labour_cost?: number;
  total_transport_cost?: number;
  total_amount?: number;
  selections: QuotationSelectionData[];
}

export interface SavedQuotation {
  id: string;
  quotation_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  project_location: string;
  project_type?: string | null;
  area_sqft?: string | null;
  description?: string | null;
  service_id?: string | null;
  service_name_snapshot?: string | null;
  status: string;
  notes?: string | null;
  labour_charge_per_sqft?: number | null;
  transport_charge_per_sqft?: number | null;
  total_material_cost?: number | null;
  total_labour_cost?: number | null;
  total_transport_cost?: number | null;
  total_amount?: number | null;
  created_at: string;
  updated_at?: string;
  selections?: {
    id: string;
    quotation_id: string;
    parameter_id?: string | null;
    product_id?: string | null;
    parameter_name_snapshot: string;
    product_name_snapshot: string;
    price_per_sqft?: number | null;
    total_price?: number | null;
  }[];
}

// ============================================================================
// PRICING SYSTEM CONFIG & CALCULATIONS
// ============================================================================

export interface QuotationPricingSettings {
  labourRate: number; // in INR per sqft (Default: 17)
  transportRate: number; // in INR per sqft (Default: 2)
}

export const DEFAULT_PRICING_SETTINGS: QuotationPricingSettings = {
  labourRate: 17,
  transportRate: 2,
};

const SETTINGS_STORAGE_KEY = 'popwale_quotation_pricing_rates';

/**
 * Fetch quotation pricing settings (Labour and Transport charges)
 */
export async function getQuotationPricingSettings(): Promise<QuotationPricingSettings> {
  try {
    const { data, error } = await (supabase as any)
      .from('quotation_settings')
      .select('key, value');

    if (error || !data || (data as any[]).length === 0) {
      // Check localStorage fallback
      const cached = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (cached) {
        try {
          return { ...DEFAULT_PRICING_SETTINGS, ...JSON.parse(cached) };
        } catch (e) {
          // ignore
        }
      }
      return DEFAULT_PRICING_SETTINGS;
    }

    const settings: QuotationPricingSettings = { ...DEFAULT_PRICING_SETTINGS };
    (data as any[]).forEach((row: { key: string; value: any }) => {
      const val = typeof row.value === 'number' ? row.value : parseFloat(row.value);
      if (!isNaN(val)) {
        if (row.key === 'labour_charge_per_sqft') settings.labourRate = val;
        if (row.key === 'transport_charge_per_sqft') settings.transportRate = val;
      }
    });

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    return settings;
  } catch (error) {
    console.warn('Error fetching quotation settings, using defaults:', error);
    return DEFAULT_PRICING_SETTINGS;
  }
}

/**
 * Update quotation pricing settings (admin)
 */
export async function updateQuotationPricingSettings(settings: QuotationPricingSettings): Promise<void> {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));

  try {
    const updates = [
      {
        key: 'labour_charge_per_sqft',
        value: Number(settings.labourRate),
        description: 'Standard Labour charge per sq.ft in INR',
        updated_at: new Date().toISOString(),
      },
      {
        key: 'transport_charge_per_sqft',
        value: Number(settings.transportRate),
        description: 'Standard Transportation charge per sq.ft in INR',
        updated_at: new Date().toISOString(),
      },
    ];

    const { error } = await (supabase as any)
      .from('quotation_settings')
      .upsert(updates, { onConflict: 'key' });

    if (error) throw error;
  } catch (err) {
    console.warn('Could not persist pricing settings to DB, saved to local store:', err);
  }
}

export interface QuotationBreakdownItem {
  parameterId: string;
  parameterName: string;
  productId: string;
  productName: string;
  pricePerSqft: number;
  totalCost: number;
}

export interface QuotationBreakdownResult {
  areaSqft: number;
  items: QuotationBreakdownItem[];
  materialRatePerSqft: number;
  totalMaterialCost: number;
  labourRate: number;
  totalLabourCost: number;
  transportRate: number;
  totalTransportCost: number;
  totalRatePerSqft: number;
  totalAmount: number;
}

/**
 * Calculates complete itemized quotation costs based on area and selections
 */
export function calculateQuotationBreakdown(
  areaSqftVal: string | number,
  selections: {
    parameterId: string;
    parameterName: string;
    productId: string;
    productName: string;
    pricePerSqft?: number;
  }[],
  pricingSettings: QuotationPricingSettings = DEFAULT_PRICING_SETTINGS
): QuotationBreakdownResult {
  const areaSqft = Math.max(0, Number(areaSqftVal) || 0);
  let materialRatePerSqft = 0;

  const items: QuotationBreakdownItem[] = selections.map((sel) => {
    const rate = Math.max(0, Number(sel.pricePerSqft) || 0);
    materialRatePerSqft += rate;
    const totalCost = Math.round(rate * areaSqft * 100) / 100;
    return {
      parameterId: sel.parameterId,
      parameterName: sel.parameterName,
      productId: sel.productId,
      productName: sel.productName,
      pricePerSqft: rate,
      totalCost,
    };
  });

  const totalMaterialCost = Math.round(materialRatePerSqft * areaSqft * 100) / 100;
  const labourRate = Number(pricingSettings.labourRate) || 17;
  const totalLabourCost = Math.round(labourRate * areaSqft * 100) / 100;
  const transportRate = Number(pricingSettings.transportRate) || 2;
  const totalTransportCost = Math.round(transportRate * areaSqft * 100) / 100;

  const totalRatePerSqft = materialRatePerSqft + labourRate + transportRate;
  const totalAmount = totalMaterialCost + totalLabourCost + totalTransportCost;

  return {
    areaSqft,
    items,
    materialRatePerSqft,
    totalMaterialCost,
    labourRate,
    totalLabourCost,
    transportRate,
    totalTransportCost,
    totalRatePerSqft,
    totalAmount,
  };
}

// ============================================================================
// PUBLIC / CLIENT DATA FETCHING
// ============================================================================

/**
 * Fetch all active services ordered by sort_order
 */
export async function getActiveServices(): Promise<QuotationService[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn('Error fetching services from DB, checking fallback:', error);
    return getFallbackServices();
  }
}

/**
 * Fetch active parameters and their active products for a service
 */
export async function getParametersForService(
  serviceId: string
): Promise<ServiceParameter[]> {
  try {
    const { data, error } = await supabase
      .from('service_parameters')
      .select(`
        *,
        products:parameter_products(*)
      `)
      .eq('service_id', serviceId)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;

    return (data || []).map((param: any) => ({
      ...param,
      price_per_sqft: Number(param.price_per_sqft) || 0,
      products: (param.products || [])
        .filter((p: ParameterProduct) => p.is_active)
        .sort((a: ParameterProduct, b: ParameterProduct) => a.sort_order - b.sort_order),
    }));
  } catch (error) {
    console.warn('Error fetching parameters from DB:', error);
    return getFallbackParameters(serviceId);
  }
}

/**
 * Server/client validated quotation submission
 */
export async function submitQuotation(
  payload: QuotationSubmissionPayload
): Promise<{ success: boolean; quotationNumber: string; quotationId?: string; error?: string }> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  const quotationNumber = `PW-${year}-${randomSuffix}`;

  try {
    // 1. Insert quotation master record with financial snapshots
    const insertPayload: Record<string, any> = {
      quotation_number: quotationNumber,
      customer_name: payload.customer_name.trim(),
      customer_email: payload.customer_email.trim().toLowerCase(),
      customer_phone: payload.customer_phone.trim(),
      project_location: payload.project_location.trim(),
      project_type: payload.project_type || null,
      area_sqft: payload.area_sqft || null,
      description: payload.description || null,
      service_id: payload.service_id,
      service_name_snapshot: payload.service_name_snapshot,
      status: 'pending',
    };

    if (payload.labour_charge_per_sqft !== undefined) {
      insertPayload.labour_charge_per_sqft = payload.labour_charge_per_sqft;
    }
    if (payload.transport_charge_per_sqft !== undefined) {
      insertPayload.transport_charge_per_sqft = payload.transport_charge_per_sqft;
    }
    if (payload.total_material_cost !== undefined) {
      insertPayload.total_material_cost = payload.total_material_cost;
    }
    if (payload.total_labour_cost !== undefined) {
      insertPayload.total_labour_cost = payload.total_labour_cost;
    }
    if (payload.total_transport_cost !== undefined) {
      insertPayload.total_transport_cost = payload.total_transport_cost;
    }
    if (payload.total_amount !== undefined) {
      insertPayload.total_amount = payload.total_amount;
    }

    let quoteData: any;
    try {
      const { data, error: quoteError } = await (supabase as any)
        .from('quotations')
        .insert(insertPayload)
        .select('id')
        .single();

      if (quoteError) throw quoteError;
      quoteData = data;
    } catch (insertErr: any) {
      console.warn('Quotation insert with pricing columns failed, retrying base insert:', insertErr);
      const basePayload = {
        quotation_number: quotationNumber,
        customer_name: payload.customer_name.trim(),
        customer_email: payload.customer_email.trim().toLowerCase(),
        customer_phone: payload.customer_phone.trim(),
        project_location: payload.project_location.trim(),
        project_type: payload.project_type || null,
        area_sqft: payload.area_sqft || null,
        description: payload.description || null,
        service_id: payload.service_id,
        service_name_snapshot: payload.service_name_snapshot,
        status: 'pending',
      };
      const { data, error: fallbackError } = await (supabase as any)
        .from('quotations')
        .insert(basePayload)
        .select('id')
        .single();

      if (fallbackError) throw fallbackError;
      quoteData = data;
    }

    const quotationId = quoteData.id;

    // 2. Insert quotation selections with price snapshots
    if (payload.selections && payload.selections.length > 0) {
      const selectionsWithPricing = payload.selections.map((sel) => ({
        quotation_id: quotationId,
        parameter_id: sel.parameter_id,
        product_id: sel.product_id,
        parameter_name_snapshot: sel.parameter_name_snapshot,
        product_name_snapshot: sel.product_name_snapshot,
        price_per_sqft: sel.price_per_sqft ?? 0,
        total_price: sel.total_price ?? 0,
      }));

      try {
        const { error: selError } = await (supabase as any)
          .from('quotation_selections')
          .insert(selectionsWithPricing);

        if (selError) throw selError;
      } catch (selErr) {
        console.warn('Selections insert with pricing failed, retrying base insert:', selErr);
        const baseSelections = payload.selections.map((sel) => ({
          quotation_id: quotationId,
          parameter_id: sel.parameter_id,
          product_id: sel.product_id,
          parameter_name_snapshot: sel.parameter_name_snapshot,
          product_name_snapshot: sel.product_name_snapshot,
        }));
        await (supabase as any).from('quotation_selections').insert(baseSelections);
      }
    }

    return {
      success: true,
      quotationNumber,
      quotationId,
    };
  } catch (err: any) {
    console.error('API submission failed:', err);
    return {
      success: false,
      quotationNumber: '',
      error: err.message || 'Database error during submission',
    };
  }
}

// ============================================================================
// ADMIN PANEL CRUD API
// ============================================================================

export async function fetchFullAdminHierarchy() {
  const { data: services, error: srvError } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (srvError) throw srvError;

  const { data: parameters, error: paramError } = await supabase
    .from('service_parameters')
    .select('*')
    .order('sort_order', { ascending: true });

  if (paramError) throw paramError;

  const { data: products, error: prodError } = await supabase
    .from('parameter_products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (prodError) throw prodError;

  return {
    services: services || [],
    parameters: (parameters || []).map((p: any) => ({
      ...p,
      price_per_sqft: Number(p.price_per_sqft) || 0,
    })),
    products: products || [],
  };
}

export async function createService(payload: Partial<QuotationService>) {
  const slug = payload.slug || payload.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'service';
  return supabase.from('services').insert({
    name: payload.name!,
    slug,
    title: payload.title || payload.name,
    description: payload.description || null,
    image: payload.image || null,
    is_active: payload.is_active ?? true,
    sort_order: payload.sort_order ?? 0,
  }).select().single();
}

export async function updateService(id: string, payload: Partial<QuotationService>) {
  return supabase.from('services').update({
    name: payload.name,
    slug: payload.slug,
    title: payload.title,
    description: payload.description,
    image: payload.image,
    is_active: payload.is_active,
    sort_order: payload.sort_order,
  }).eq('id', id).select().single();
}

export async function deleteService(id: string) {
  return supabase.from('services').delete().eq('id', id);
}

export async function createParameter(payload: Partial<ServiceParameter>) {
  const slug = payload.slug || payload.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'param';
  return supabase.from('service_parameters').insert({
    service_id: payload.service_id!,
    name: payload.name!,
    slug,
    title: payload.title || payload.name,
    description: payload.description || null,
    price_per_sqft: payload.price_per_sqft !== undefined ? Number(payload.price_per_sqft) : 0,
    is_required: payload.is_required ?? true,
    is_active: payload.is_active ?? true,
    sort_order: payload.sort_order ?? 0,
  }).select().single();
}

export async function updateParameter(id: string, payload: Partial<ServiceParameter>) {
  const updateData: Record<string, any> = {};
  if (payload.name !== undefined) updateData.name = payload.name;
  if (payload.slug !== undefined) updateData.slug = payload.slug;
  if (payload.title !== undefined) updateData.title = payload.title;
  if (payload.description !== undefined) updateData.description = payload.description;
  if (payload.price_per_sqft !== undefined) updateData.price_per_sqft = Number(payload.price_per_sqft);
  if (payload.is_required !== undefined) updateData.is_required = payload.is_required;
  if (payload.is_active !== undefined) updateData.is_active = payload.is_active;
  if (payload.sort_order !== undefined) updateData.sort_order = payload.sort_order;

  return supabase.from('service_parameters').update(updateData).eq('id', id).select().single();
}

export async function deleteParameter(id: string) {
  return supabase.from('service_parameters').delete().eq('id', id);
}

export async function createProduct(payload: Partial<ParameterProduct>) {
  const slug = payload.slug || payload.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'product';
  return supabase.from('parameter_products').insert({
    parameter_id: payload.parameter_id!,
    name: payload.name!,
    slug,
    title: payload.title || payload.name,
    description: payload.description || null,
    image: payload.image || null,
    price_per_sqft: payload.price_per_sqft !== undefined ? Number(payload.price_per_sqft) : null,
    is_active: payload.is_active ?? true,
    sort_order: payload.sort_order ?? 0,
  }).select().single();
}

export async function updateProduct(id: string, payload: Partial<ParameterProduct>) {
  const updateData: Record<string, any> = {
    name: payload.name,
    slug: payload.slug,
    title: payload.title,
    description: payload.description,
    image: payload.image,
    is_active: payload.is_active,
    sort_order: payload.sort_order,
  };
  if (payload.price_per_sqft !== undefined) {
    updateData.price_per_sqft = payload.price_per_sqft !== null ? Number(payload.price_per_sqft) : null;
  }
  return supabase.from('parameter_products').update(updateData).eq('id', id).select().single();
}

export async function deleteProduct(id: string) {
  return supabase.from('parameter_products').delete().eq('id', id);
}

export async function fetchAllQuotations(): Promise<SavedQuotation[]> {
  const { data, error } = await supabase
    .from('quotations')
    .select(`
      *,
      selections:quotation_selections(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as SavedQuotation[];
}

export async function updateQuotationStatus(id: string, status: string, notes?: string) {
  return supabase
    .from('quotations')
    .update({ status, notes })
    .eq('id', id);
}

export async function uploadCatalogImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `catalog-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `catalog/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('gallery')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// ============================================================================
// INITIAL SEED / FALLBACK DATA (Guarantees zero downtime while setup is applied)
// ============================================================================

const FALLBACK_SERVICES: QuotationService[] = [
  {
    id: 'srv-gypsum',
    name: 'Gypsum Ceiling',
    slug: 'gypsum-ceiling',
    title: 'Premium Gypsum False Ceiling',
    description: 'Seamless, durable, fire-resistant and modern false ceiling designs with flush finish.',
    image: '/assets/hero-gypsum-ceiling.jpg',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'srv-grid',
    name: 'Grid Ceiling',
    slug: 'grid-ceiling',
    title: 'Commercial Modular Grid Ceiling',
    description: 'Easy-to-access 2x2 acoustic modular ceiling panels for offices and retail spaces.',
    image: '/assets/hero-grid-ceiling.jpg',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'srv-pvc',
    name: 'PVC Ceiling',
    slug: 'pvc-ceiling',
    title: 'Waterproof & Moisture-Proof PVC Ceiling',
    description: 'Lightweight, low maintenance, termite-proof and 100% waterproof ceiling panels.',
    image: '/assets/hero-soffit-channel.jpg',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'srv-stretch',
    name: 'Stretch Ceiling',
    slug: 'stretch-ceiling',
    title: 'Luxurious Translucent Stretch Ceiling',
    description: 'Ultra-modern backlit, printed, and high-gloss polymer stretch ceilings.',
    image: '/assets/hero-stretch-ceiling.jpg',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'srv-punning',
    name: 'Punning Work',
    slug: 'punning-work',
    title: 'Ultra-Smooth Wall & Ceiling Punning',
    description: 'Mirror-finish surface leveling using high-grade Gyproc punning compound.',
    image: '/assets/service-walls.jpg',
    is_active: true,
    sort_order: 5,
  },
];

const FALLBACK_PARAMETERS: Record<string, ServiceParameter[]> = {
  'srv-gypsum': [
    {
      id: 'p-gyp-channel',
      service_id: 'srv-gypsum',
      name: 'Channel',
      slug: 'channel',
      title: 'Ceiling Framing Channel',
      description: 'Select the galvanized steel framing section for load support and anti-rust protection.',
      price_per_sqft: 10,
      is_required: true,
      is_active: true,
      sort_order: 1,
      products: [
        {
          id: 'prod-gyp-ch-1',
          parameter_id: 'p-gyp-channel',
          name: 'Saint-Gobain Gyproc Ultra Channel',
          slug: 'gyproc-ultra-channel',
          title: 'Gyproc Ultra GI Channel (0.50mm, 150 GSM)',
          description: 'Engineered with ribbed knurling for maximum screw grip and zero sag.',
          price_per_sqft: 10,
          is_active: true,
          sort_order: 1,
        },
        {
          id: 'prod-gyp-ch-2',
          parameter_id: 'p-gyp-channel',
          name: 'USG Boral Steel Section',
          slug: 'usg-boral-steel',
          title: 'USG Boral Heavy-Duty Framing (0.55mm)',
          description: 'Premium galvanized steel with exceptional tensile rigidity and load rating.',
          price_per_sqft: 12,
          is_active: true,
          sort_order: 2,
        },
      ],
    },
    {
      id: 'p-gyp-sheet',
      service_id: 'srv-gypsum',
      name: 'Sheet',
      slug: 'sheet',
      title: 'Gypsum Board Type',
      description: 'Choose the gypsum ceiling board specification and performance grade.',
      price_per_sqft: 25,
      is_required: true,
      is_active: true,
      sort_order: 2,
      products: [
        {
          id: 'prod-gyp-sh-1',
          parameter_id: 'p-gyp-sheet',
          name: 'Saint-Gobain Gyproc Regular 12.5mm',
          slug: 'gyproc-regular-125',
          title: 'Gyproc Regular 12.5mm Board',
          description: 'Industry benchmark standard gypsum board with tapered edges for seamless jointing.',
          price_per_sqft: 25,
          is_active: true,
          sort_order: 1,
        },
      ],
    },
  ],
};

function getFallbackServices(): QuotationService[] {
  return FALLBACK_SERVICES;
}

function getFallbackParameters(serviceId: string): ServiceParameter[] {
  return FALLBACK_PARAMETERS[serviceId] || [];
}

export interface TermsCondition {
  id: string;
  bullet_point: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

const DEFAULT_TERMS = [
  { bullet_point: 'Prices are based on current raw material rates and are subject to change after 30 days of quotation.', sort_order: 10 },
  { bullet_point: 'Standard site work requires uninterrupted power supply and water access to be provided by the client.', sort_order: 20 },
  { bullet_point: 'Scaffolding for height above 10 feet shall be charged extra or arranged by the client.', sort_order: 30 },
  { bullet_point: '50% advance payment is required upon design approval, 40% running payment, and 10% upon completion.', sort_order: 40 },
  { bullet_point: 'All materials used will be of premium quality (Gyproc, Saint-Gobain) as selected by the client.', sort_order: 50 },
  { bullet_point: 'The company is not liable for structural cracks or issues resulting from architectural or building flaws.', sort_order: 60 }
];

export async function getTermsConditions(): Promise<TermsCondition[]> {
  try {
    const { data, error } = await (supabase as any)
      .from('terms_conditions')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    
    if (!data || data.length === 0) {
      return DEFAULT_TERMS.map((t, idx) => ({
        id: `default-${idx}`,
        bullet_point: t.bullet_point,
        sort_order: t.sort_order
      }));
    }
    
    return data as any as TermsCondition[];
  } catch (error) {
    console.error('Error fetching terms conditions:', error);
    return DEFAULT_TERMS.map((t, idx) => ({
      id: `default-${idx}`,
      bullet_point: t.bullet_point,
      sort_order: t.sort_order
    }));
  }
}

export async function addTermsCondition(bullet_point: string, sort_order: number): Promise<void> {
  const { error } = await (supabase as any)
    .from('terms_conditions')
    .insert([{ bullet_point, sort_order }]);
  if (error) throw error;
}

export async function updateTermsCondition(id: string, bullet_point: string, sort_order: number): Promise<void> {
  if (id.startsWith('default-')) {
    const { error } = await (supabase as any)
      .from('terms_conditions')
      .insert([{ bullet_point, sort_order }]);
    if (error) throw error;
    return;
  }
  const { error } = await (supabase as any)
    .from('terms_conditions')
    .update({ bullet_point, sort_order, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteTermsCondition(id: string): Promise<void> {
  if (id.startsWith('default-')) {
    return;
  }
  const { error } = await (supabase as any)
    .from('terms_conditions')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
