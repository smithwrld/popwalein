import React, { useState, useEffect, useMemo } from 'react';
import {
  QuotationService,
  ServiceParameter,
  ParameterProduct,
  fetchFullAdminHierarchy,
  createService,
  updateService,
  deleteService,
  createParameter,
  updateParameter,
  deleteParameter,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadCatalogImage,
  getQuotationPricingSettings,
  updateQuotationPricingSettings,
  QuotationPricingSettings,
  DEFAULT_PRICING_SETTINGS,
} from '@/lib/quotationApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  SlidersHorizontal,
  Package,
  Loader2,
  Upload,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const QuotationServiceManager: React.FC = () => {
  const { toast } = useToast();

  // Master catalog state
  const [services, setServices] = useState<QuotationService[]>([]);
  const [parameters, setParameters] = useState<ServiceParameter[]>([]);
  const [products, setProducts] = useState<ParameterProduct[]>([]);
  const [pricingSettings, setPricingSettings] = useState<QuotationPricingSettings>(DEFAULT_PRICING_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [savingPricing, setSavingPricing] = useState<boolean>(false);

  // Active workspace filter
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Modal states
  const [serviceModal, setServiceModal] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    data: Partial<QuotationService>;
  }>({ open: false, mode: 'create', data: {} });

  const [paramModal, setParamModal] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    serviceId: string;
    data: Partial<ServiceParameter>;
  }>({ open: false, mode: 'create', serviceId: '', data: {} });

  const [productModal, setProductModal] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    parameterId: string;
    data: Partial<ParameterProduct>;
  }>({ open: false, mode: 'create', parameterId: '', data: {} });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Load catalog & pricing
  const loadCatalog = async () => {
    setLoading(true);
    try {
      const [data, settings] = await Promise.all([
        fetchFullAdminHierarchy(),
        getQuotationPricingSettings(),
      ]);
      setServices(data.services);
      setParameters(data.parameters);
      setProducts(data.products);
      setPricingSettings(settings);

      // Default select first service if none selected
      if (!selectedServiceId && data.services.length > 0) {
        setSelectedServiceId(data.services[0].id);
      }
    } catch (error: any) {
      toast({
        title: 'Failed to load catalog',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePricingSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPricing(true);
    try {
      await updateQuotationPricingSettings(pricingSettings);
      toast({
        title: 'Fixed Charges Saved',
        description: `Labour: ₹${pricingSettings.labourRate}/sq.ft, Transportation: ₹${pricingSettings.transportRate}/sq.ft updated.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error saving rates',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSavingPricing(false);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  // Ensure valid selected service
  useEffect(() => {
    if (services.length > 0 && (!selectedServiceId || !services.find((s) => s.id === selectedServiceId))) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  // Current active service
  const activeService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) || null,
    [services, selectedServiceId]
  );

  // Filtered parameters for the active service
  const serviceParameters = useMemo(() => {
    if (!activeService) return [];
    return parameters.filter((p) => p.service_id === activeService.id);
  }, [parameters, activeService]);

  // Handle image upload helper
  const handleUploadImageIfProvided = async (): Promise<string | null> => {
    if (!imageFile) return null;
    try {
      const url = await uploadCatalogImage(imageFile);
      setImageFile(null);
      return url;
    } catch (error: any) {
      toast({ title: 'Image upload failed', description: error.message, variant: 'destructive' });
      return null;
    }
  };

  // ==========================================
  // SERVICE ACTIONS
  // ==========================================
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceModal.data.name?.trim()) return;

    setSaving(true);
    try {
      const uploadedUrl = await handleUploadImageIfProvided();
      const payload = {
        ...serviceModal.data,
        image: uploadedUrl || serviceModal.data.image,
      };

      if (serviceModal.mode === 'create') {
        const res = await createService({ ...payload, sort_order: services.length + 1 });
        if (res.data) setSelectedServiceId(res.data.id);
        toast({ title: 'Service Created', description: `${payload.name} added.` });
      } else {
        await updateService(serviceModal.data.id!, payload);
        toast({ title: 'Service Updated', description: `${payload.name} saved.` });
      }

      setServiceModal({ open: false, mode: 'create', data: {} });
      loadCatalog();
    } catch (error: any) {
      toast({ title: 'Error saving service', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (service: QuotationService) => {
    if (!window.confirm(`Are you sure you want to delete service "${service.name}"? This removes all associated parameters and product options.`)) return;

    try {
      await deleteService(service.id);
      toast({ title: 'Service Deleted', description: `${service.name} removed.` });
      loadCatalog();
    } catch (error: any) {
      toast({ title: 'Error deleting service', description: error.message, variant: 'destructive' });
    }
  };

  // ==========================================
  // PARAMETER ACTIONS
  // ==========================================
  const handleSaveParameter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paramModal.data.name?.trim()) return;

    setSaving(true);
    try {
      const payload = {
        ...paramModal.data,
        service_id: paramModal.serviceId,
      };

      if (paramModal.mode === 'create') {
        const existingCount = parameters.filter((p) => p.service_id === paramModal.serviceId).length;
        await createParameter({ ...payload, sort_order: existingCount + 1 });
        toast({ title: 'Parameter Created', description: `${payload.name} added.` });
      } else {
        await updateParameter(paramModal.data.id!, payload);
        toast({ title: 'Parameter Updated', description: `${payload.name} saved.` });
      }

      setParamModal({ open: false, mode: 'create', serviceId: '', data: {} });
      loadCatalog();
    } catch (error: any) {
      toast({ title: 'Error saving parameter', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteParameter = async (param: ServiceParameter) => {
    if (!window.confirm(`Delete parameter "${param.name}" and all its products?`)) return;

    try {
      await deleteParameter(param.id);
      toast({ title: 'Parameter Deleted', description: `${param.name} removed.` });
      loadCatalog();
    } catch (error: any) {
      toast({ title: 'Error deleting parameter', description: error.message, variant: 'destructive' });
    }
  };

  // ==========================================
  // PRODUCT ACTIONS
  // ==========================================
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productModal.data.name?.trim()) return;

    setSaving(true);
    try {
      const uploadedUrl = await handleUploadImageIfProvided();
      const payload = {
        ...productModal.data,
        parameter_id: productModal.parameterId,
        image: uploadedUrl || productModal.data.image,
      };

      if (productModal.mode === 'create') {
        const existingCount = products.filter((p) => p.parameter_id === productModal.parameterId).length;
        await createProduct({ ...payload, sort_order: existingCount + 1 });
        toast({ title: 'Product Added', description: `${payload.name} added.` });
      } else {
        await updateProduct(productModal.data.id!, payload);
        toast({ title: 'Product Updated', description: `${payload.name} saved.` });
      }

      setProductModal({ open: false, mode: 'create', parameterId: '', data: {} });
      loadCatalog();
    } catch (error: any) {
      toast({ title: 'Error saving product', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (prod: ParameterProduct) => {
    if (!window.confirm(`Delete product "${prod.name}"?`)) return;

    try {
      await deleteProduct(prod.id);
      toast({ title: 'Product Deleted', description: `${prod.name} removed.` });
      loadCatalog();
    } catch (error: any) {
      toast({ title: 'Error deleting product', description: error.message, variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-card rounded-[28px] border border-border">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
        <p className="text-sm font-semibold text-foreground">Loading quotation catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* TOP CONTROL BAR: SERVICE SELECTION & ACTIONS */}
      {/* ========================================================================= */}
      <div className="bg-card rounded-[28px] p-5 sm:p-6 border border-border shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Quotation Services & Specifications
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Select a service to configure specifications and product options.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadCatalog}
              className="rounded-full text-xs gap-1.5 h-9"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </Button>

            <Button
              size="sm"
              className="btn-hero rounded-full text-xs gap-1.5 h-9 px-4 font-bold"
              onClick={() => setServiceModal({ open: true, mode: 'create', data: { is_active: true } })}
            >
              <Plus className="w-3.5 h-3.5" />
              New Service
            </Button>
          </div>
        </div>

        {/* FIXED CHARGES CONTROL STRIP */}
        <div className="bg-muted/30 border border-border/80 rounded-[20px] p-3.5 sm:p-4">
          <form onSubmit={handleSavePricingSettings} className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                System Fixed Quotation Charges (Multiplied by Area sq.ft)
              </span>
              <p className="text-[11px] text-muted-foreground">
                Standard fixed rates applied to every customer quotation calculation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full border border-border">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">Labour:</span>
                <span className="text-xs text-muted-foreground">₹</span>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  value={pricingSettings.labourRate}
                  onChange={(e) =>
                    setPricingSettings((prev) => ({
                      ...prev,
                      labourRate: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="h-6 w-16 text-xs font-bold rounded-md px-1 text-center"
                />
                <span className="text-[10px] text-muted-foreground">/sq.ft</span>
              </div>

              <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full border border-border">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Transport:</span>
                <span className="text-xs text-muted-foreground">₹</span>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  value={pricingSettings.transportRate}
                  onChange={(e) =>
                    setPricingSettings((prev) => ({
                      ...prev,
                      transportRate: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="h-6 w-16 text-xs font-bold rounded-md px-1 text-center"
                />
                <span className="text-[10px] text-muted-foreground">/sq.ft</span>
              </div>

              <Button
                type="submit"
                size="sm"
                disabled={savingPricing}
                className="btn-hero rounded-full text-xs h-8 px-3 font-bold"
              >
                {savingPricing ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                Save Fixed Rates
              </Button>
            </div>
          </form>
        </div>

        {/* SERVICE SELECTOR TABS */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase mr-1">Service:</span>
          {services.map((svc) => {
            const isSelected = selectedServiceId === svc.id;
            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => setSelectedServiceId(svc.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border',
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20 scale-[1.02]'
                    : 'bg-muted/40 text-foreground border-border hover:bg-muted hover:border-border/80'
                )}
              >
                <span>{svc.name}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                    isSelected ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {parameters.filter((p) => p.service_id === svc.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SERVICE CONTROLS */}
        {activeService && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-muted/30 rounded-[20px] border border-border/60">
            <div className="flex items-center gap-3">
              {activeService.image ? (
                <img
                  src={activeService.image}
                  alt={activeService.name}
                  className="w-10 h-10 rounded-[12px] object-cover border border-border shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-[12px] bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-foreground">{activeService.name}</h3>
                  <Badge variant={activeService.is_active ? 'outline' : 'secondary'} className="text-[10px] py-0 rounded-full">
                    {activeService.is_active ? 'Active' : 'Disabled'}
                  </Badge>
                </div>
                {activeService.description && (
                  <p className="text-xs text-muted-foreground line-clamp-1">{activeService.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-full text-xs px-3 text-foreground hover:bg-muted"
                onClick={() => setServiceModal({ open: true, mode: 'edit', data: activeService })}
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" />
                Edit Service
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-full text-xs px-3 text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteService(activeService)}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SPECIFICATIONS WORKSPACE */}
      {/* ========================================================================= */}
      {activeService && (
        <div className="bg-card rounded-[28px] p-5 sm:p-6 border border-border shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                Parameters ({serviceParameters.length})
              </h3>
              <p className="text-xs text-muted-foreground">Add components like Channel, Sheet, Fasteners, Joint Compound.</p>
            </div>

            <Button
              size="sm"
              onClick={() =>
                setParamModal({
                  open: true,
                  mode: 'create',
                  serviceId: activeService.id,
                  data: {
                    is_required: true,
                    is_active: true,
                  },
                })
              }
              className="btn-hero rounded-full text-xs h-9 px-4 font-bold"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Parameter
            </Button>
          </div>

          {serviceParameters.length === 0 ? (
            <div className="text-center py-12 px-4 bg-muted/20 rounded-[24px] border border-dashed border-border space-y-3">
              <SlidersHorizontal className="w-10 h-10 mx-auto text-muted-foreground opacity-50" />
              <h4 className="text-base font-bold text-foreground">No Parameters Yet</h4>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Add parameter options to start defining choice sets for {activeService.name}.
              </p>
              <Button
                size="sm"
                onClick={() =>
                  setParamModal({
                    open: true,
                    mode: 'create',
                    serviceId: activeService.id,
                    data: {
                      is_required: true,
                      is_active: true,
                    },
                  })
                }
                className="btn-hero rounded-full text-xs px-5 h-9 font-bold"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add First Parameter
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {serviceParameters.map((param, index) => {
                const paramProducts = products.filter((p) => p.parameter_id === param.id);

                return (
                  <div
                    key={param.id}
                    className="bg-muted/10 border-2 border-border/80 hover:border-border rounded-[28px] p-5 sm:p-6 transition-all space-y-4"
                  >
                    {/* Parameter Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-border/60">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 sm:mt-0">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base sm:text-lg font-bold text-foreground">{param.name}</h4>
                            <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 text-[11px] py-0 rounded-full font-bold">
                              ₹{param.price_per_sqft || 0} / sq.ft
                            </Badge>
                            {param.is_required ? (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] py-0 rounded-full font-semibold">
                                Required Choice
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-[10px] py-0 rounded-full">
                                Optional
                              </Badge>
                            )}
                            <Badge variant={param.is_active ? 'outline' : 'secondary'} className="text-[10px] py-0 rounded-full">
                              {param.is_active ? 'Active' : 'Disabled'}
                            </Badge>
                          </div>
                          {param.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{param.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Parameter Actions */}
                      <div className="flex items-center gap-1.5 self-end lg:self-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-full text-xs px-2.5"
                          onClick={() =>
                            setParamModal({
                              open: true,
                              mode: 'edit',
                              serviceId: activeService.id,
                              data: param,
                            })
                          }
                        >
                          <Edit2 className="w-3.5 h-3.5 mr-1" />
                          Edit Parameter
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-full text-xs px-2.5 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteParameter(param)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Products Sub-Section */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-primary" />
                          Product Options / Brand Materials ({paramProducts.length})
                        </span>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setProductModal({
                              open: true,
                              mode: 'create',
                              parameterId: param.id,
                              data: { is_active: true },
                            })
                          }
                          className="h-7 rounded-full text-xs px-3 gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add Option Product
                        </Button>
                      </div>

                      {paramProducts.length === 0 ? (
                        <div className="p-4 bg-muted/20 border border-dashed border-border rounded-[20px] text-xs text-muted-foreground text-center">
                          No product options configured. Click "Add Option Product" to add materials/brands.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {paramProducts.map((prod) => (
                            <div
                              key={prod.id}
                              className="p-3.5 rounded-[20px] bg-card border border-border/80 flex items-center justify-between gap-3 shadow-xs hover:border-primary/40 transition-colors"
                            >
                              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                {prod.image ? (
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="w-10 h-10 rounded-[10px] object-cover border border-border shrink-0"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-[10px] bg-muted flex items-center justify-center shrink-0">
                                    <Package className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                )}
                                <div className="space-y-0.5 flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate">{prod.name}</h5>
                                    {prod.price_per_sqft !== undefined && prod.price_per_sqft !== null && prod.price_per_sqft > 0 && (
                                      <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-300 py-0">
                                        ₹{prod.price_per_sqft}/sqft
                                      </Badge>
                                    )}
                                    {!prod.is_active && (
                                      <Badge variant="secondary" className="text-[9px] py-0">
                                        Inactive
                                      </Badge>
                                    )}
                                  </div>
                                  {prod.title && prod.title !== prod.name && (
                                    <p className="text-[11px] font-medium text-primary truncate">{prod.title}</p>
                                  )}
                                  {prod.description && (
                                    <p className="text-[11px] text-muted-foreground line-clamp-1 truncate">{prod.description}</p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-full text-xs"
                                  onClick={() =>
                                    setProductModal({
                                      open: true,
                                      mode: 'edit',
                                      parameterId: param.id,
                                      data: prod,
                                    })
                                  }
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-full text-xs text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDeleteProduct(prod)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SERVICE MODAL */}
      {/* ========================================================================= */}
      <Dialog open={serviceModal.open} onOpenChange={(open) => !open && setServiceModal((prev) => ({ ...prev, open: false }))}>
        <DialogContent className="rounded-[28px] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{serviceModal.mode === 'create' ? 'Create New Service' : 'Edit Service'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveService} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="s-name">Service Name *</Label>
              <Input
                id="s-name"
                placeholder="e.g., Gypsum Ceiling"
                value={serviceModal.data.name || ''}
                onChange={(e) => setServiceModal((prev) => ({ ...prev, data: { ...prev.data, name: e.target.value } }))}
                className="rounded-[20px]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-desc">Description</Label>
              <Textarea
                id="s-desc"
                placeholder="Short tagline explaining this ceiling service..."
                value={serviceModal.data.description || ''}
                onChange={(e) => setServiceModal((prev) => ({ ...prev, data: { ...prev.data, description: e.target.value } }))}
                rows={2}
                className="rounded-[20px]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-img">Service Image</Label>
              <Input
                id="s-img"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="rounded-[20px]"
              />
              <Input
                placeholder="Or image URL..."
                value={serviceModal.data.image || ''}
                onChange={(e) => setServiceModal((prev) => ({ ...prev, data: { ...prev.data, image: e.target.value } }))}
                className="rounded-[20px] mt-1"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="s-active">Active in Customer Quotation</Label>
              <Switch
                id="s-active"
                checked={serviceModal.data.is_active ?? true}
                onCheckedChange={(checked) =>
                  setServiceModal((prev) => ({ ...prev, data: { ...prev.data, is_active: checked } }))
                }
              />
            </div>
            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setServiceModal((prev) => ({ ...prev, open: false }))}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="btn-hero rounded-full">
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {serviceModal.mode === 'create' ? 'Create Service' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* PARAMETER MODAL */}
      {/* ========================================================================= */}
      <Dialog open={paramModal.open} onOpenChange={(open) => !open && setParamModal((prev) => ({ ...prev, open: false }))}>
        <DialogContent className="rounded-[28px] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{paramModal.mode === 'create' ? 'Add Parameter / Specification' : 'Edit Parameter'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveParameter} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="p-name">Parameter Name *</Label>
              <Input
                id="p-name"
                placeholder="e.g., Sheet, Channel, Fasteners"
                value={paramModal.data.name || ''}
                onChange={(e) => setParamModal((prev) => ({ ...prev, data: { ...prev.data, name: e.target.value } }))}
                className="rounded-[20px]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-desc">Description (Optional)</Label>
              <Textarea
                id="p-desc"
                placeholder="Customer instructions for this choice..."
                value={paramModal.data.description || ''}
                onChange={(e) => setParamModal((prev) => ({ ...prev, data: { ...prev.data, description: e.target.value } }))}
                rows={2}
                className="rounded-[20px]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-price" className="flex items-center justify-between">
                <span>Material Rate per sq.ft (₹) *</span>
                <span className="text-xs text-primary font-bold">Multiplied by Area</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-bold">₹</span>
                <Input
                  id="p-price"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="e.g., 10"
                  value={paramModal.data.price_per_sqft ?? 0}
                  onChange={(e) =>
                    setParamModal((prev) => ({
                      ...prev,
                      data: { ...prev.data, price_per_sqft: parseFloat(e.target.value) || 0 },
                    }))
                  }
                  className="rounded-[20px] pl-8"
                  required
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Base price in Rupees per sq.ft (e.g., ₹10/sq.ft on 500 sq.ft = ₹5,000).
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="p-req">Required Selection (Customer must pick 1)</Label>
              <Switch
                id="p-req"
                checked={paramModal.data.is_required ?? true}
                onCheckedChange={(checked) =>
                  setParamModal((prev) => ({ ...prev, data: { ...prev.data, is_required: checked } }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="p-act">Active Status</Label>
              <Switch
                id="p-act"
                checked={paramModal.data.is_active ?? true}
                onCheckedChange={(checked) =>
                  setParamModal((prev) => ({ ...prev, data: { ...prev.data, is_active: checked } }))
                }
              />
            </div>
            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setParamModal((prev) => ({ ...prev, open: false }))}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="btn-hero rounded-full">
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {paramModal.mode === 'create' ? 'Add Parameter' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ========================================================================= */}
      {/* PRODUCT MODAL */}
      {/* ========================================================================= */}
      <Dialog open={productModal.open} onOpenChange={(open) => !open && setProductModal((prev) => ({ ...prev, open: false }))}>
        <DialogContent className="rounded-[28px] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{productModal.mode === 'create' ? 'Add Product Option' : 'Edit Product'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pr-name">Product / Brand Name *</Label>
              <Input
                id="pr-name"
                placeholder="e.g., Saint-Gobain Gyproc Ultra Channel"
                value={productModal.data.name || ''}
                onChange={(e) => setProductModal((prev) => ({ ...prev, data: { ...prev.data, name: e.target.value } }))}
                className="rounded-[20px]"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pr-title">Display Title / Tagline</Label>
              <Input
                id="pr-title"
                placeholder="e.g., GI Ultra knurled framing section (0.5mm)"
                value={productModal.data.title || ''}
                onChange={(e) => setProductModal((prev) => ({ ...prev, data: { ...prev.data, title: e.target.value } }))}
                className="rounded-[20px]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pr-desc">Description</Label>
              <Textarea
                id="pr-desc"
                placeholder="Key specifications, warranty, or benefits..."
                value={productModal.data.description || ''}
                onChange={(e) => setProductModal((prev) => ({ ...prev, data: { ...prev.data, description: e.target.value } }))}
                rows={2}
                className="rounded-[20px]"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pr-img">Product Image</Label>
              <Input
                id="pr-img"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="rounded-[20px]"
              />
              <Input
                placeholder="Or image URL..."
                value={productModal.data.image || ''}
                onChange={(e) => setProductModal((prev) => ({ ...prev, data: { ...prev.data, image: e.target.value } }))}
                className="rounded-[20px] mt-1"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pr-price">Custom Rate per sq.ft (₹) (Optional Override)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-bold">₹</span>
                <Input
                  id="pr-price"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="Leave blank to use parameter rate"
                  value={productModal.data.price_per_sqft ?? ''}
                  onChange={(e) =>
                    setProductModal((prev) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        price_per_sqft: e.target.value === '' ? null : parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                  className="rounded-[20px] pl-8"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Leave blank to automatically use the parameter's standard rate.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="pr-active">Active</Label>
              <Switch
                id="pr-active"
                checked={productModal.data.is_active ?? true}
                onCheckedChange={(checked) =>
                  setProductModal((prev) => ({ ...prev, data: { ...prev.data, is_active: checked } }))
                }
              />
            </div>
            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setProductModal((prev) => ({ ...prev, open: false }))}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="btn-hero rounded-full">
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {productModal.mode === 'create' ? 'Add Option' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
