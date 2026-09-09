import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { StepProjectDetails, ProjectDetailsData } from './StepProjectDetails';
import {
  QuotationService,
  ServiceParameter,
  getTermsConditions,
  calculateQuotationBreakdown,
  QuotationPricingSettings,
  DEFAULT_PRICING_SETTINGS,
} from '@/lib/quotationApi';
import {
  User,
  Layers,
  CheckCircle2,
  Edit2,
  Send,
  Loader2,
  Sparkles,
  MessageCircle,
  Copy,
  FileText,
  Calculator,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateQuotationPdf } from '@/lib/pdfGenerator';

interface SelectedProductDetail {
  parameterId: string;
  parameterName: string;
  productId: string;
  productName: string;
  productDescription?: string | null;
}

interface StepReviewSubmitProps {
  projectDetails: ProjectDetailsData;
  onProjectDetailsChange: (field: keyof ProjectDetailsData, value: string) => void;
  service: QuotationService | null;
  parameters: ServiceParameter[];
  selectedProducts: Record<string, string>; // parameterId -> productId
  pricingSettings?: QuotationPricingSettings;
  onEditStep: (stepIndex: number) => void;
  onSubmitQuotation: () => void;
  isSubmitting: boolean;
  submissionResult: {
    success: boolean;
    quotationNumber: string;
    whatsappUrl?: string;
  } | null;
  onReset: () => void;
}

export const StepReviewSubmit: React.FC<StepReviewSubmitProps> = ({
  projectDetails,
  onProjectDetailsChange,
  service,
  parameters,
  selectedProducts,
  pricingSettings = DEFAULT_PRICING_SETTINGS,
  onEditStep,
  onSubmitQuotation,
  isSubmitting,
  submissionResult,
  onReset,
}) => {
  const { toast } = useToast();
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Extract selected product details
  const requirementsList: SelectedProductDetail[] = useMemo(() => {
    return parameters
      .filter((param) => selectedProducts[param.id])
      .map((param) => {
        const prodId = selectedProducts[param.id];
        const prod = param.products?.find((p) => p.id === prodId);
        return {
          parameterId: param.id,
          parameterName: param.name,
          productId: prodId,
          productName: prod?.name || 'Selected Option',
          productDescription: prod?.description || null,
        };
      });
  }, [parameters, selectedProducts]);

  // Calculate live itemized quotation breakdown
  const breakdown = useMemo(() => {
    const selections = parameters
      .filter((param) => selectedProducts[param.id])
      .map((param) => {
        const prodId = selectedProducts[param.id];
        const prod = param.products?.find((p) => p.id === prodId);
        const rate = (prod && typeof prod.price_per_sqft === 'number' && prod.price_per_sqft > 0)
          ? prod.price_per_sqft
          : (Number(param.price_per_sqft) || 0);

        return {
          parameterId: param.id,
          parameterName: param.name,
          productId: prodId,
          productName: prod?.name || 'Selected Specification',
          pricePerSqft: rate,
        };
      });

    return calculateQuotationBreakdown(
      projectDetails.area,
      selections,
      pricingSettings
    );
  }, [projectDetails.area, parameters, selectedProducts, pricingSettings]);

  const handleDownloadPdf = async () => {
    if (!submissionResult) return;
    setPdfGenerating(true);
    try {
      const terms = await getTermsConditions();
      await generateQuotationPdf({
        quotationNumber: submissionResult.quotationNumber,
        customerName: projectDetails.name,
        customerPhone: projectDetails.phone,
        customerEmail: projectDetails.email,
        projectLocation: projectDetails.location,
        projectType: projectDetails.projectType,
        areaSqft: projectDetails.area,
        description: projectDetails.description,
        serviceName: service?.name || 'Ceiling & Plaster Solutions',
        selections: breakdown.items.map((item) => ({
          parameterName: item.parameterName,
          productName: item.productName,
          pricePerSqft: item.pricePerSqft,
          totalCost: item.totalCost,
        })),
        labourRate: breakdown.labourRate,
        labourCost: breakdown.totalLabourCost,
        transportRate: breakdown.transportRate,
        transportCost: breakdown.totalTransportCost,
        totalMaterialCost: breakdown.totalMaterialCost,
        totalRatePerSqft: breakdown.totalRatePerSqft,
        totalAmount: breakdown.totalAmount,
      }, terms);
      
      toast({
        title: 'PDF Downloaded',
        description: `Quotation PDF #${submissionResult.quotationNumber} exported successfully with commercial breakdown.`,
      });
    } catch (err: any) {
      console.error('Failed to generate PDF:', err);
      toast({
        title: 'Error generating PDF',
        description: err.message || 'Could not compile PDF quotation.',
        variant: 'destructive',
      });
    } finally {
      setPdfGenerating(false);
    }
  };

  if (submissionResult && submissionResult.success) {
    return (
      <div className="text-center py-8 px-4 sm:px-8 bg-card rounded-[28px] border-2 border-primary/20 shadow-xl shadow-primary/5 animate-scale-in max-w-2xl mx-auto space-y-5">
        <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
          <Sparkles className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            Quotation Submitted Successfully
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Thank You, {projectDetails.name}!
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
            Your quotation request has been recorded with reference number:
          </p>
        </div>

        {/* Quotation Number Pill */}
        <div className="inline-flex items-center gap-3 bg-muted/60 px-5 py-2.5 rounded-full border border-border">
          <span className="font-mono text-base sm:text-lg font-bold text-foreground tracking-wider">
            {submissionResult.quotationNumber}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => {
              navigator.clipboard.writeText(submissionResult.quotationNumber);
              toast({
                title: 'Copied to clipboard',
                description: `Quotation #${submissionResult.quotationNumber} copied!`,
              });
            }}
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Total Price Callout in Success Screen */}
        <div className="p-4 bg-muted/40 border border-border rounded-[20px] text-center space-y-1">
          <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
            TOTAL ESTIMATE AMOUNT
          </span>
          <div className="text-2xl sm:text-3xl font-black text-foreground">
            ₹{breakdown.totalAmount.toLocaleString('en-IN')}
            <span className="text-xs font-semibold text-muted-foreground ml-1.5 italic">+GST</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            All-inclusive calculation: Materials + Labour (₹{breakdown.labourRate}/sqft) + Transport (₹{breakdown.transportRate}/sqft) for {breakdown.areaSqft} sq.ft
          </p>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/15 rounded-[20px] text-left text-xs sm:text-sm space-y-2">
          <p className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            What happens next:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1 text-xs">
            <li>Our Rajkot technical estimator will review your exact material selections.</li>
            <li>You will receive a line-item estimate & rate breakdown within 24 hours.</li>
            <li>Free site measurement & physical sample showcase available on request.</li>
            <li>Customer Signature & POP WALE Authorization space is included in the downloaded PDF.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {submissionResult.whatsappUrl && (
            <Button
              className="btn-hero rounded-full flex items-center justify-center gap-2 text-sm py-4 px-6"
              onClick={() => window.open(submissionResult.whatsappUrl, '_blank')}
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Chat on WhatsApp Directly
            </Button>
          )}

          <Button
            className="rounded-full bg-primary-muted hover:bg-primary-muted/80 text-primary border border-primary/20 flex items-center justify-center gap-2 text-sm py-4 px-6 font-semibold"
            onClick={handleDownloadPdf}
            disabled={pdfGenerating}
          >
            {pdfGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            Download PDF Quotation
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-border hover:bg-muted py-4 px-6 text-sm font-semibold"
            onClick={onReset}
          >
            Create Another Quote
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="text-left mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Your Details & Quotation Review
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Enter your contact and project details below to calculate your live estimate and receive your formal quotation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Customer & Project Details Form (Asked in the Final Step) */}
        <div className="bg-card rounded-[28px] p-5 sm:p-6 border border-border/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/50">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Project & Contact Information
            </h3>
            <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              Final Step
            </span>
          </div>

          <StepProjectDetails
            data={projectDetails}
            onChange={onProjectDetailsChange}
            hideHeader
          />
        </div>

        {/* Selected Service Card */}
        <div className="bg-card rounded-[28px] p-5 sm:p-6 border border-border/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-border/50">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              Selected Service
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(0)}
              className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-full gap-1 font-semibold px-3"
            >
              <Edit2 className="w-3 h-3" />
              Change Service
            </Button>
          </div>

          <div className="p-4 rounded-[20px] bg-muted/30 border border-border/50 flex items-center gap-4">
            {service?.image && (
              <img
                src={service.image}
                alt={service.name}
                className="w-16 h-16 rounded-[14px] object-cover border border-border shrink-0"
              />
            )}
            <div>
              <span className="text-[11px] font-semibold text-primary block mb-0.5">
                Primary Service
              </span>
              <h4 className="text-base sm:text-lg font-bold text-foreground">{service?.name || '—'}</h4>
              {service?.description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{service.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Component Specifications Card */}
        <div className="bg-card rounded-[28px] p-5 sm:p-6 border border-border/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-border/50">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              Component Specifications ({requirementsList.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditStep(1)}
              className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10 rounded-full gap-1 font-semibold px-3"
            >
              <Edit2 className="w-3 h-3" />
              Change Specs
            </Button>
          </div>

          {requirementsList.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">No component selections required.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {requirementsList.map((req) => (
                <div
                  key={req.parameterId}
                  className="p-3.5 rounded-[20px] bg-muted/20 border border-border/60 flex items-start gap-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      {req.parameterName}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                      {req.productName}
                    </h5>
                    {req.productDescription && (
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                        {req.productDescription}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Commercial Cost Breakdown Card */}
        <div className="bg-card rounded-[28px] p-5 sm:p-6 border border-border/80 shadow-sm relative overflow-hidden space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              <Calculator className="w-4 h-4 text-primary" />
              Itemized Quotation Breakdown {breakdown.areaSqft > 0 ? `(${breakdown.areaSqft} sq.ft)` : ''}
            </h3>
            <span className="text-xs font-semibold text-muted-foreground">
              Rate × Total Area
            </span>
          </div>

          {breakdown.areaSqft <= 0 && (
            <div className="p-3.5 rounded-[20px] bg-primary/5 border border-primary/20 flex items-center gap-2.5 text-xs text-primary font-medium">
              <Sparkles className="w-4 h-4 shrink-0 text-primary" />
              <span>Enter your approximate room / ceiling area (sq.ft) in the form above to see the calculated estimate in real-time.</span>
            </div>
          )}

          {/* Mobile View: Clean Stacked Cards (NO horizontal slide/sidebar, 100% natural mobile reading flow) */}
          <div className="block md:hidden space-y-2.5">
            {breakdown.items.map((item) => (
              <div
                key={item.parameterId}
                className="p-3.5 bg-muted/25 rounded-[20px] border border-border/70 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                      {item.parameterName}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground">
                      {item.productName}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-foreground block">
                      ₹{item.totalCost.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Amount</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Rate: <strong className="text-foreground">₹{item.pricePerSqft.toFixed(2)} / sq.ft</strong></span>
                  <span>Area: <strong className="text-foreground">{breakdown.areaSqft} sq.ft</strong></span>
                </div>
              </div>
            ))}

            {/* Labour Charge Card (Mobile) */}
            <div className="p-3.5 bg-amber-500/[0.05] rounded-[20px] border border-amber-500/25 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
                    LABOUR CHARGE
                  </span>
                  <p className="text-xs text-amber-700/80 dark:text-amber-400">
                    Skilled ceiling framing & installation workmanship
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200 block">
                    ₹{breakdown.totalLabourCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-amber-800/70 dark:text-amber-400/70">Fixed Charge</span>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-900/70 dark:text-amber-300/80">
                <span>Rate: <strong className="text-amber-950 dark:text-amber-100">₹{breakdown.labourRate.toFixed(2)} / sq.ft</strong></span>
                <span>Area: <strong className="text-amber-950 dark:text-amber-100">{breakdown.areaSqft} sq.ft</strong></span>
              </div>
            </div>

            {/* Transportation Charge Card (Mobile) */}
            <div className="p-3.5 bg-emerald-500/[0.05] rounded-[20px] border border-emerald-500/25 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                    TRANSPORTATION
                  </span>
                  <p className="text-xs text-emerald-700/80 dark:text-emerald-400">
                    Materials dispatch, loading & site transit
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200 block">
                    ₹{breakdown.totalTransportCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-800/70 dark:text-emerald-400/70">Fixed Charge</span>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-900/70 dark:text-emerald-300/80">
                <span>Rate: <strong className="text-emerald-950 dark:text-emerald-100">₹{breakdown.transportRate.toFixed(2)} / sq.ft</strong></span>
                <span>Area: <strong className="text-emerald-950 dark:text-emerald-100">{breakdown.areaSqft} sq.ft</strong></span>
              </div>
            </div>
          </div>

          {/* Tablet & Desktop View: Clean Proportional Table (Fits perfectly on Realme Pad 3 & laptops without any scrollbar) */}
          <div className="hidden md:block">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/60 text-muted-foreground">
                  <th className="pb-2.5 font-semibold w-[26%]">Scope / Item</th>
                  <th className="pb-2.5 font-semibold w-[34%]">Selected Specification</th>
                  <th className="pb-2.5 font-semibold text-right w-[14%]">Rate (₹/sqft)</th>
                  <th className="pb-2.5 font-semibold text-right w-[12%]">Area</th>
                  <th className="pb-2.5 font-semibold text-right w-[14%]">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {breakdown.items.map((item) => (
                  <tr key={item.parameterId} className="hover:bg-muted/20 transition-colors">
                    <td className="py-2.5 font-semibold text-foreground pr-2">{item.parameterName}</td>
                    <td className="py-2.5 text-muted-foreground pr-2">{item.productName}</td>
                    <td className="py-2.5 text-right font-medium text-foreground">₹{item.pricePerSqft.toFixed(2)}</td>
                    <td className="py-2.5 text-right text-muted-foreground">{breakdown.areaSqft} sqft</td>
                    <td className="py-2.5 text-right font-bold text-foreground">₹{item.totalCost.toLocaleString('en-IN')}</td>
                  </tr>
                ))}

                {/* Labour Charge Row */}
                <tr className="bg-amber-500/[0.04] text-amber-800 dark:text-amber-300 font-medium">
                  <td className="py-2.5 font-bold pr-2">LABOUR CHARGE</td>
                  <td className="py-2.5 text-xs text-amber-700/80 dark:text-amber-400 pr-2">Skilled ceiling framing & installation workmanship</td>
                  <td className="py-2.5 text-right font-bold">₹{breakdown.labourRate.toFixed(2)}</td>
                  <td className="py-2.5 text-right">{breakdown.areaSqft} sqft</td>
                  <td className="py-2.5 text-right font-bold">₹{breakdown.totalLabourCost.toLocaleString('en-IN')}</td>
                </tr>

                {/* Transportation Charge Row */}
                <tr className="bg-emerald-500/[0.04] text-emerald-800 dark:text-emerald-300 font-medium">
                  <td className="py-2.5 font-bold pr-2">TRANSPORTATION</td>
                  <td className="py-2.5 text-xs text-emerald-700/80 dark:text-emerald-400 pr-2">Materials dispatch, loading & site transit</td>
                  <td className="py-2.5 text-right font-bold">₹{breakdown.transportRate.toFixed(2)}</td>
                  <td className="py-2.5 text-right">{breakdown.areaSqft} sqft</td>
                  <td className="py-2.5 text-right font-bold">₹{breakdown.totalTransportCost.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TOTAL AMOUNT HIGHLIGHT (Matching User Requirement: Total Amount + GST) */}
          <div className="mt-2 p-4 bg-muted/40 rounded-[20px] border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                TOTAL AMOUNT
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-baseline gap-1.5">
                <span>₹{breakdown.totalAmount.toLocaleString('en-IN')}</span>
                <span className="text-xs font-semibold text-muted-foreground italic">+GST</span>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-muted-foreground space-y-0.5">
              <div>Effective Rate: <strong className="text-foreground">₹{breakdown.totalRatePerSqft.toFixed(2)} / sq.ft</strong></div>
              <div className="flex items-center gap-1 sm:justify-end text-[11px] text-primary">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                Includes Customer & POP WALE Signatures in PDF
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission CTA */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/30 p-5 rounded-[28px] border border-border/70">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-foreground">Ready to receive your estimate?</h4>
        </div>

        <Button
          onClick={onSubmitQuotation}
          disabled={isSubmitting}
          className="btn-hero rounded-full w-full sm:w-auto px-7 py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 shrink-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Quote...
            </>
          ) : (
            <>
              Submit Quotation Request
              <Send className="w-4 h-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
