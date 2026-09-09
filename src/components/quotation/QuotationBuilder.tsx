import React, { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { QuotationProgressBar, StepItem } from './QuotationProgressBar';
import { ProjectDetailsData } from './StepProjectDetails';
import { StepServiceSelect } from './StepServiceSelect';
import { StepParametersSelect } from './StepParametersSelect';
import { StepReviewSubmit } from './StepReviewSubmit';
import {
  QuotationService,
  ServiceParameter,
  ParameterProduct,
  getActiveServices,
  getParametersForService,
  submitQuotation,
  getQuotationPricingSettings,
  QuotationPricingSettings,
  DEFAULT_PRICING_SETTINGS,
  calculateQuotationBreakdown,
} from '@/lib/quotationApi';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const QuotationBuilder: React.FC = () => {
  const { toast } = useToast();

  // Step state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Form states
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    projectType: 'residential',
    area: '',
    description: '',
  });

  // Services catalog data
  const [services, setServices] = useState<QuotationService[]>([]);
  const [parameters, setParameters] = useState<ServiceParameter[]>([]);

  // Selections
  const [selectedService, setSelectedService] = useState<QuotationService | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, string>>({});
  const [pricingSettings, setPricingSettings] = useState<QuotationPricingSettings>(DEFAULT_PRICING_SETTINGS);

  // Loading states
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [loadingParameters, setLoadingParameters] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Submission result
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    quotationNumber: string;
    whatsappUrl?: string;
  } | null>(null);

  // 1. Initial Load: Fetch Active Services & Pricing Settings
  useEffect(() => {
    async function loadInitialData() {
      setLoadingServices(true);
      try {
        const [servicesData, pricingData] = await Promise.all([
          getActiveServices(),
          getQuotationPricingSettings(),
        ]);
        setServices(servicesData);
        setPricingSettings(pricingData);
      } catch (error) {
        console.error('Failed to load services or pricing:', error);
      } finally {
        setLoadingServices(false);
      }
    }
    loadInitialData();
  }, []);

  // 2. Fetch parameters directly when Service changes
  useEffect(() => {
    if (!selectedService) {
      setParameters([]);
      setSelectedProducts({});
      return;
    }

    async function loadParameters() {
      setLoadingParameters(true);
      try {
        const params = await getParametersForService(selectedService!.id);
        setParameters(params);

        // Auto-select first product for single-product parameters
        const defaultSelections: Record<string, string> = {};
        params.forEach((param) => {
          if (param.products && param.products.length === 1) {
            defaultSelections[param.id] = param.products[0].id;
          }
        });
        if (Object.keys(defaultSelections).length > 0) {
          setSelectedProducts((prev) => ({ ...defaultSelections, ...prev }));
        }
      } catch (error) {
        console.error('Failed to load parameters:', error);
      } finally {
        setLoadingParameters(false);
      }
    }
    loadParameters();
  }, [selectedService]);

  // Dynamic step configuration: 1. Service -> 2. Specifications -> 3. Details & Review (Final Step)
  const dynamicSteps: StepItem[] = useMemo(() => {
    return [
      { id: 'service', title: 'Select Service', shortLabel: 'Service' },
      { id: 'requirements', title: 'Specifications', shortLabel: 'Specs' },
      { id: 'review', title: 'Details & Review', shortLabel: 'Review' },
    ];
  }, []);

  const currentStepId = dynamicSteps[currentStepIndex]?.id || 'service';

  // Handle Project Details input change
  const handleProjectDetailsChange = (field: keyof ProjectDetailsData, value: string) => {
    setProjectDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Service Selection (Clears incompatible specifications)
  const handleSelectService = (service: QuotationService) => {
    if (selectedService?.id !== service.id) {
      setSelectedService(service);
      setSelectedProducts({});
    }
  };

  // Handle Product Selection for a Parameter
  const handleSelectProduct = (parameter: ServiceParameter, product: ParameterProduct) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [parameter.id]: product.id,
    }));
  };

  // Step Validation Check
  const isCurrentStepValid = useMemo(() => {
    switch (currentStepId) {
      case 'service':
        return Boolean(selectedService);
      case 'requirements':
        return parameters
          .filter((p) => p.is_required)
          .every((p) => Boolean(selectedProducts[p.id]));
      case 'review':
        return Boolean(
          projectDetails.name.trim() &&
            projectDetails.email.trim() &&
            projectDetails.phone.trim() &&
            projectDetails.location.trim() &&
            projectDetails.area.trim() &&
            parseFloat(projectDetails.area) > 0
        );
      default:
        return false;
    }
  }, [currentStepId, selectedService, parameters, selectedProducts, projectDetails]);

  // Step Navigation Handlers
  const handleNextStep = () => {
    if (!isCurrentStepValid) {
      toast({
        title: 'Please complete required fields',
        description: 'Fill in the required information or make a selection to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (currentStepIndex < dynamicSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (index: number) => {
    if (index >= 0 && index < dynamicSteps.length) {
      setCurrentStepIndex(index);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  // Final Quotation Submission
  const handleSubmitQuotation = async () => {
    if (!selectedService) {
      toast({
        title: 'Please select a service',
        description: 'Choose a primary ceiling service before submitting.',
        variant: 'destructive',
      });
      return;
    }

    if (
      !projectDetails.name.trim() ||
      !projectDetails.email.trim() ||
      !projectDetails.phone.trim() ||
      !projectDetails.location.trim() ||
      !projectDetails.area.trim() ||
      parseFloat(projectDetails.area) <= 0
    ) {
      toast({
        title: 'Please complete required fields',
        description: 'Name, email, phone, location, and a valid area (sq.ft) are required to generate your quotation.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectionsPayload = parameters
        .filter((param) => selectedProducts[param.id])
        .map((param) => {
          const prodId = selectedProducts[param.id];
          const prod = param.products?.find((p) => p.id === prodId);
          const rate = (prod && typeof prod.price_per_sqft === 'number' && prod.price_per_sqft > 0)
            ? prod.price_per_sqft
            : (Number(param.price_per_sqft) || 0);
          const areaNum = parseFloat(projectDetails.area) || 0;
          return {
            parameter_id: param.id,
            product_id: prodId,
            parameter_name_snapshot: param.name,
            product_name_snapshot: prod?.name || 'Standard Specification',
            price_per_sqft: rate,
            total_price: Math.round(rate * areaNum * 100) / 100,
          };
        });

      const breakdown = calculateQuotationBreakdown(
        projectDetails.area,
        selectionsPayload.map((s) => ({
          parameterId: s.parameter_id,
          parameterName: s.parameter_name_snapshot,
          productId: s.product_id,
          productName: s.product_name_snapshot,
          pricePerSqft: s.price_per_sqft,
        })),
        pricingSettings
      );

      const result = await submitQuotation({
        customer_name: projectDetails.name,
        customer_email: projectDetails.email,
        customer_phone: projectDetails.phone,
        project_location: projectDetails.location,
        project_type: projectDetails.projectType,
        area_sqft: projectDetails.area,
        description: projectDetails.description,
        service_id: selectedService.id,
        service_name_snapshot: selectedService.name,
        labour_charge_per_sqft: breakdown.labourRate,
        transport_charge_per_sqft: breakdown.transportRate,
        total_material_cost: breakdown.totalMaterialCost,
        total_labour_cost: breakdown.totalLabourCost,
        total_transport_cost: breakdown.totalTransportCost,
        total_amount: breakdown.totalAmount,
        selections: selectionsPayload,
      });

      const requirementsText = selectionsPayload
        .map((sel) => `• ${sel.parameter_name_snapshot}: *${sel.product_name_snapshot}* (${sel.price_per_sqft > 0 ? `₹${sel.price_per_sqft}/sqft` : 'Base'})`)
        .join('\n');

      const message = `🏗️ *New Quotation Request [#${result.quotationNumber}]*

👤 *Customer:* ${projectDetails.name}
📱 *Phone:* ${projectDetails.phone}
📧 *Email:* ${projectDetails.email}
📍 *Location:* ${projectDetails.location}
🏢 *Space Type:* ${projectDetails.projectType || 'Not specified'}
📏 *Area:* ${projectDetails.area ? `${projectDetails.area} sq.ft` : 'Not specified'}

🛠️ *Service:* ${selectedService.name}
📋 *Specifications:*
${requirementsText || 'Standard Inclusions'}

💰 *Commercial Estimate Breakdown:*
• Material Specifications: ₹${breakdown.totalMaterialCost.toLocaleString('en-IN')}
• Labour Charge (₹${breakdown.labourRate}/sq.ft): ₹${breakdown.totalLabourCost.toLocaleString('en-IN')}
• Transportation (₹${breakdown.transportRate}/sq.ft): ₹${breakdown.totalTransportCost.toLocaleString('en-IN')}
⭐ *TOTAL AMOUNT: ₹${breakdown.totalAmount.toLocaleString('en-IN')} +GST* (₹${breakdown.totalRatePerSqft.toFixed(2)}/sq.ft)

📝 *Notes:* ${projectDetails.description || 'None'}`;

      const whatsappNumber = '919909094033';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      try {
        window.open(whatsappUrl, '_blank');
      } catch (e) {
        console.warn('Popup blocked, customer can click WhatsApp button');
      }

      setSubmissionResult({
        success: true,
        quotationNumber: result.quotationNumber,
        whatsappUrl,
      });

      toast({
        title: 'Quotation Generated!',
        description: `Reference #${result.quotationNumber} recorded. Redirecting to WhatsApp.`,
      });
    } catch (error: any) {
      console.error('Error submitting quotation:', error);
      toast({
        title: 'Submission error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetBuilder = () => {
    setCurrentStepIndex(0);
    setSubmissionResult(null);
    setSelectedService(null);
    setSelectedProducts({});
    setProjectDetails({
      name: '',
      email: '',
      phone: '',
      location: '',
      projectType: 'residential',
      area: '',
      description: '',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Dynamic Multi-Step Progress Bar */}
      <QuotationProgressBar
        steps={dynamicSteps}
        currentStepIndex={currentStepIndex}
        onStepClick={handleJumpToStep}
      />

      {/* Main Parent Layout (28px Border Radius) */}
      <div className="bg-gradient-to-br from-card to-muted/40 border border-border rounded-[28px] p-5 sm:p-8 shadow-lg shadow-black/[0.03] relative overflow-hidden transition-all duration-300">
        {/* Step 1: Select Service (Grid of 2) */}
        {currentStepId === 'service' && (
          <StepServiceSelect
            services={services}
            selectedServiceId={selectedService?.id || null}
            onSelectService={handleSelectService}
            isLoading={loadingServices}
          />
        )}

        {/* Step 2: Select Specifications / Materials (Grid of 2) */}
        {currentStepId === 'requirements' && (
          <StepParametersSelect
            parameters={parameters}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
            isLoading={loadingParameters}
          />
        )}

        {/* Step 3 (Final Step): Details & Quotation Review */}
        {currentStepId === 'review' && (
          <StepReviewSubmit
            projectDetails={projectDetails}
            onProjectDetailsChange={handleProjectDetailsChange}
            service={selectedService}
            parameters={parameters}
            selectedProducts={selectedProducts}
            pricingSettings={pricingSettings}
            onEditStep={handleJumpToStep}
            onSubmitQuotation={handleSubmitQuotation}
            isSubmitting={isSubmitting}
            submissionResult={submissionResult}
            onReset={handleResetBuilder}
          />
        )}

        {/* Bottom Navigation Pill Buttons (Hidden on final success screen) */}
        {!submissionResult && (
          <div className="mt-8 pt-5 border-t border-border/60 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            {/* Back Button (Pill shape) */}
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0 || isSubmitting}
              className="w-full sm:w-auto h-11 px-6 rounded-full border-border/80 text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-muted/80 disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {/* Next / Submit Button (Pill shape) */}
            {currentStepIndex < dynamicSteps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={!isCurrentStepValid || isSubmitting}
                className="btn-hero rounded-full w-full sm:w-auto h-11 px-8 font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/15 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
