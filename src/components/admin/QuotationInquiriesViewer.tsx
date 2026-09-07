import React, { useState, useEffect } from 'react';
import { SavedQuotation, fetchAllQuotations, updateQuotationStatus, getTermsConditions, getQuotationPricingSettings } from '@/lib/quotationApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateQuotationPdf } from '@/lib/pdfGenerator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Eye,
  MessageCircle,
} from 'lucide-react';

export const QuotationInquiriesViewer: React.FC = () => {
  const { toast } = useToast();
  const [quotations, setQuotations] = useState<SavedQuotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<SavedQuotation | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusVal, setStatusVal] = useState<string>('pending');
  const [notesVal, setNotesVal] = useState<string>('');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const handleDownloadPdf = async (quote: SavedQuotation) => {
    setPdfGenerating(true);
    try {
      const [terms, pricingSettings] = await Promise.all([
        getTermsConditions(),
        getQuotationPricingSettings(),
      ]);

      const areaSqftNum = Math.max(0, parseFloat(quote.area_sqft || '0') || 0);
      const labourRate = quote.labour_charge_per_sqft !== null && quote.labour_charge_per_sqft !== undefined
        ? quote.labour_charge_per_sqft
        : pricingSettings.labourRate;
      const transportRate = quote.transport_charge_per_sqft !== null && quote.transport_charge_per_sqft !== undefined
        ? quote.transport_charge_per_sqft
        : pricingSettings.transportRate;

      const selections = (quote.selections || []).map((sel) => {
        const rate = sel.price_per_sqft !== null && sel.price_per_sqft !== undefined ? sel.price_per_sqft : 0;
        const total = sel.total_price !== null && sel.total_price !== undefined ? sel.total_price : Math.round(rate * areaSqftNum * 100) / 100;
        return {
          parameterName: sel.parameter_name_snapshot,
          productName: sel.product_name_snapshot,
          pricePerSqft: rate,
          totalCost: total,
        };
      });

      const dateString = new Date(quote.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const labourCost = quote.total_labour_cost !== null && quote.total_labour_cost !== undefined
        ? quote.total_labour_cost
        : Math.round(labourRate * areaSqftNum * 100) / 100;
      const transportCost = quote.total_transport_cost !== null && quote.total_transport_cost !== undefined
        ? quote.total_transport_cost
        : Math.round(transportRate * areaSqftNum * 100) / 100;
      const materialCost = quote.total_material_cost !== null && quote.total_material_cost !== undefined
        ? quote.total_material_cost
        : selections.reduce((acc, s) => acc + (s.totalCost || 0), 0);
      const totalAmount = quote.total_amount !== null && quote.total_amount !== undefined
        ? quote.total_amount
        : (materialCost + labourCost + transportCost);

      const totalRate = areaSqftNum > 0 ? (totalAmount / areaSqftNum) : (labourRate + transportRate);

      await generateQuotationPdf({
        quotationNumber: quote.quotation_number,
        customerName: quote.customer_name,
        customerPhone: quote.customer_phone,
        customerEmail: quote.customer_email || '',
        projectLocation: quote.project_location,
        projectType: quote.project_type || '',
        areaSqft: quote.area_sqft || '',
        description: quote.description || '',
        serviceName: quote.service_name_snapshot || 'Ceiling & Plaster Solutions',
        selections,
        labourRate,
        labourCost,
        transportRate,
        transportCost,
        totalMaterialCost: materialCost,
        totalRatePerSqft: totalRate,
        totalAmount,
        dateString
      }, terms);

      toast({
        title: 'PDF Downloaded',
        description: `Quotation PDF #${quote.quotation_number} downloaded.`,
      });
    } catch (err: any) {
      console.error('Failed to generate PDF:', err);
      toast({
        title: 'Error generating PDF',
        description: err.message || 'Could not compile PDF.',
        variant: 'destructive',
      });
    } finally {
      setPdfGenerating(false);
    }
  };

  const loadQuotations = async () => {
    setLoading(true);
    try {
      const data = await fetchAllQuotations();
      setQuotations(data);
    } catch (error: any) {
      console.warn('Error loading quotations:', error);
      toast({
        title: 'Quotations Notice',
        description: error.message || 'Connecting to database...',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotations();
  }, []);

  const handleOpenDetail = (quote: SavedQuotation) => {
    setSelectedQuote(quote);
    setStatusVal(quote.status || 'pending');
    setNotesVal(quote.notes || '');
  };

  const handleUpdateStatus = async () => {
    if (!selectedQuote) return;
    setStatusUpdating(true);
    try {
      await updateQuotationStatus(selectedQuote.id, statusVal, notesVal);
      toast({
        title: 'Quotation Updated',
        description: `Status changed to ${statusVal}`,
      });
      loadQuotations();
      setSelectedQuote((prev) => (prev ? { ...prev, status: statusVal, notes: notesVal } : null));
    } catch (error: any) {
      toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setStatusUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Completed</Badge>;
      case 'in_progress':
      case 'contacted':
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">In Progress</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Pending Review</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Loading quotation inquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card p-6 rounded-3xl border border-border">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Customer Quotation Submissions ({quotations.length})
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Review customer selections, material specifications, and update lead statuses.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={loadQuotations}
          className="rounded-xl flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Quotations List */}
      {quotations.length === 0 ? (
        <Card className="card-elegant text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
          <p className="text-muted-foreground font-medium">No quotation submissions received yet.</p>
          <p className="text-xs text-muted-foreground mt-1">
            Submissions made through the customer quote builder will automatically show up here.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {quotations.map((quote) => (
            <div
              key={quote.id}
              className="bg-card rounded-2xl p-5 border border-border/80 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-sm font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-lg">
                    {quote.quotation_number}
                  </span>
                  {getStatusBadge(quote.status)}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(quote.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm pt-1">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <User className="w-3.5 h-3.5 text-primary" />
                    {quote.customer_name}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    {quote.customer_phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {quote.project_location}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap pt-1">
                  <span className="font-semibold text-foreground">
                    {quote.service_name_snapshot || 'Service'}
                  </span>
                  {quote.area_sqft && <span>• {quote.area_sqft} sq.ft</span>}
                  <span>• {(quote.selections || []).length} components specified</span>
                  {quote.total_amount ? (
                    <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 font-bold ml-auto sm:ml-0">
                      ₹{quote.total_amount.toLocaleString('en-IN')} +GST
                    </Badge>
                  ) : null}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
                <Button
                  size="sm"
                  className="btn-hero text-xs h-9 gap-1.5"
                  onClick={() => handleOpenDetail(quote)}
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Details & Components
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-9 gap-1.5"
                  onClick={() => {
                    const cleanPhone = quote.customer_phone.replace(/[^0-9]/g, '');
                    window.open(`https://wa.me/${cleanPhone}`, '_blank');
                  }}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUOTATION DETAIL MODAL */}
      {/* ========================================================================= */}
      <Dialog open={Boolean(selectedQuote)} onOpenChange={(open) => !open && setSelectedQuote(null)}>
        {selectedQuote && (
          <DialogContent className="rounded-3xl max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between gap-2 pr-6">
                <div>
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Quotation #{selectedQuote.quotation_number}
                  </DialogTitle>
                  <span className="text-xs text-muted-foreground">
                    Received on {new Date(selectedQuote.created_at).toLocaleString('en-IN')}
                  </span>
                </div>
                {getStatusBadge(selectedQuote.status)}
              </div>
            </DialogHeader>

            <div className="space-y-6 pt-2">
              {/* Customer & Location Details */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Customer & Site Information
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground block">Customer Name</span>
                    <span className="font-semibold text-foreground">{selectedQuote.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Phone</span>
                    <span className="font-semibold text-foreground">{selectedQuote.customer_phone}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Email</span>
                    <span className="font-semibold text-foreground truncate block">{selectedQuote.customer_email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Location</span>
                    <span className="font-semibold text-foreground">{selectedQuote.project_location}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Space Type</span>
                    <span className="font-semibold text-foreground capitalize">{selectedQuote.project_type || '—'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Area</span>
                    <span className="font-semibold text-foreground">{selectedQuote.area_sqft ? `${selectedQuote.area_sqft} sq.ft` : '—'}</span>
                  </div>
                </div>

                {selectedQuote.description && (
                  <div className="pt-2 border-t border-border/50 text-xs">
                    <span className="text-muted-foreground font-semibold block">Customer Notes:</span>
                    <p className="italic text-foreground mt-0.5">{selectedQuote.description}</p>
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Selected Service
                </h4>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground block">Primary Service</span>
                    <span className="text-base font-bold text-primary">{selectedQuote.service_name_snapshot || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Commercial Cost Breakdown */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Commercial Cost Breakdown ({selectedQuote.area_sqft ? `${selectedQuote.area_sqft} sq.ft` : 'Area not specified'})
                  </h4>
                  <Badge variant="outline" className="text-xs font-bold text-primary bg-primary/5 border-primary/20">
                    Labour: ₹{selectedQuote.labour_charge_per_sqft ?? 17}/sqft • Transport: ₹{selectedQuote.transport_charge_per_sqft ?? 2}/sqft
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs">
                  {(selectedQuote.selections || []).map((sel) => (
                    <div key={sel.id} className="flex justify-between py-1 border-b border-border/40 text-foreground">
                      <span>{sel.parameter_name_snapshot}: <strong>{sel.product_name_snapshot}</strong></span>
                      <span className="font-semibold">
                        {sel.price_per_sqft ? `₹${sel.price_per_sqft}/sqft • ₹${(sel.total_price ?? 0).toLocaleString('en-IN')}` : 'Included in Base'}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between py-1 border-b border-border/40 text-amber-700 dark:text-amber-400">
                    <span>Labour Charge (₹{selectedQuote.labour_charge_per_sqft ?? 17}/sq.ft × {selectedQuote.area_sqft || 0} sq.ft)</span>
                    <span className="font-bold">
                      ₹{(selectedQuote.total_labour_cost ?? ((selectedQuote.labour_charge_per_sqft ?? 17) * (parseFloat(selectedQuote.area_sqft || '0') || 0))).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-border/40 text-emerald-700 dark:text-emerald-400">
                    <span>Transportation Charge (₹{selectedQuote.transport_charge_per_sqft ?? 2}/sq.ft × {selectedQuote.area_sqft || 0} sq.ft)</span>
                    <span className="font-bold">
                      ₹{(selectedQuote.total_transport_cost ?? ((selectedQuote.transport_charge_per_sqft ?? 2) * (parseFloat(selectedQuote.area_sqft || '0') || 0))).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* TOTAL AMOUNT BOX */}
                <div className="pt-2 flex items-center justify-between bg-card p-3 rounded-xl border border-border">
                  <div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      TOTAL AMOUNT
                    </span>
                    <span className="text-lg font-extrabold text-foreground">
                      ₹{(selectedQuote.total_amount ?? (
                        (selectedQuote.total_material_cost ?? 0) +
                        (selectedQuote.total_labour_cost ?? ((selectedQuote.labour_charge_per_sqft ?? 17) * (parseFloat(selectedQuote.area_sqft || '0') || 0))) +
                        (selectedQuote.total_transport_cost ?? ((selectedQuote.transport_charge_per_sqft ?? 2) * (parseFloat(selectedQuote.area_sqft || '0') || 0)))
                      )).toLocaleString('en-IN')}
                      <span className="text-xs font-medium text-muted-foreground ml-1.5 italic">+GST</span>
                    </span>
                  </div>

                  <div className="text-right text-[11px] text-muted-foreground">
                    <span>Customer & POP WALE sign-off included in PDF</span>
                  </div>
                </div>
              </div>

              {/* Admin Status & Notes Management */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Update Inquiry Status & Internal Notes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Status</span>
                    <Select value={statusVal} onValueChange={setStatusVal}>
                      <SelectTrigger className="h-10 bg-card">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending Review</SelectItem>
                        <SelectItem value="contacted">Contacted Customer</SelectItem>
                        <SelectItem value="in_progress">Estimate In Progress</SelectItem>
                        <SelectItem value="completed">Quotation Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground">Internal Notes</span>
                    <Textarea
                      placeholder="e.g., Called client, site visit scheduled for Friday 3pm..."
                      value={notesVal}
                      onChange={(e) => setNotesVal(e.target.value)}
                      rows={2}
                      className="bg-card text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDownloadPdf(selectedQuote)}
                    disabled={pdfGenerating}
                    className="text-xs h-9 px-4 flex items-center gap-1.5"
                  >
                    {pdfGenerating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <FileText className="w-3.5 h-3.5" />
                    )}
                    Download PDF
                  </Button>
                  
                  <Button
                    onClick={handleUpdateStatus}
                    disabled={statusUpdating}
                    className="btn-hero text-xs h-9 px-4"
                  >
                    {statusUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
                    Save Status
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
