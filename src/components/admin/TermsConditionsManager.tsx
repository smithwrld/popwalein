import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  getTermsConditions,
  addTermsCondition,
  updateTermsCondition,
  deleteTermsCondition,
  TermsCondition
} from '@/lib/quotationApi';
import { ArrowUp, ArrowDown, Trash2, Plus, Edit2, Save, X, Loader2, Check } from 'lucide-react';

export const TermsConditionsManager: React.FC = () => {
  const { toast } = useToast();
  const [terms, setTerms] = useState<TermsCondition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [newTermText, setNewTermText] = useState<string>('');
  
  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const fetchTerms = async () => {
    setLoading(true);
    try {
      const data = await getTermsConditions();
      setTerms(data);
    } catch (err: any) {
      toast({
        title: 'Error loading terms',
        description: err.message || 'Failed to fetch terms and conditions.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const handleAddTerm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTermText.trim()) return;

    setActionLoading(true);
    try {
      // Find the highest sort_order to place the new item at the bottom
      const maxSortOrder = terms.reduce((max, term) => Math.max(max, term.sort_order), 0);
      const nextSortOrder = maxSortOrder + 10;

      await addTermsCondition(newTermText.trim(), nextSortOrder);
      setNewTermText('');
      toast({
        title: 'Bullet Point Added',
        description: 'New term was successfully added to the pointwise list.',
      });
      await fetchTerms();
    } catch (err: any) {
      toast({
        title: 'Error adding term',
        description: err.message || 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleStartEdit = (term: TermsCondition) => {
    setEditingId(term.id);
    setEditingText(term.bullet_point);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleSaveEdit = async (term: TermsCondition) => {
    if (!editingText.trim()) return;

    setActionLoading(true);
    try {
      await updateTermsCondition(term.id, editingText.trim(), term.sort_order);
      setEditingId(null);
      setEditingText('');
      toast({
        title: 'Bullet Point Saved',
        description: 'The term was updated successfully.',
      });
      await fetchTerms();
    } catch (err: any) {
      toast({
        title: 'Error updating term',
        description: err.message || 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this term? This action cannot be undone.')) return;

    setActionLoading(true);
    try {
      await deleteTermsCondition(id);
      toast({
        title: 'Bullet Point Deleted',
        description: 'The term has been deleted.',
      });
      await fetchTerms();
    } catch (err: any) {
      toast({
        title: 'Error deleting term',
        description: err.message || 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= terms.length) return;

    const itemA = { ...terms[index] };
    const itemB = { ...terms[targetIndex] };

    // Swap sort_order
    const tempOrder = itemA.sort_order;
    itemA.sort_order = itemB.sort_order;
    itemB.sort_order = tempOrder;

    setActionLoading(true);
    try {
      await Promise.all([
        updateTermsCondition(itemA.id, itemA.bullet_point, itemA.sort_order),
        updateTermsCondition(itemB.id, itemB.bullet_point, itemB.sort_order)
      ]);
      await fetchTerms();
      toast({
        title: 'List Reordered',
        description: 'The display order of terms has been updated.',
      });
    } catch (err: any) {
      toast({
        title: 'Error reordering list',
        description: err.message || 'Failed to shift list items.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create New Term Card */}
      <Card className="border-border/60 shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-elegant text-foreground">Add New Term / Inclusions</CardTitle>
          <CardDescription>Create a new pointwise policy or condition to display on Page 3 of the PDF estimation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTerm} className="space-y-3">
            <Textarea
              placeholder="e.g., Any alteration or extra designs requested after layout drawing sign-off will incur separate charges..."
              value={newTermText}
              onChange={(e) => setNewTermText(e.target.value)}
              rows={2}
              className="bg-card resize-none text-sm"
              disabled={actionLoading || loading}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={actionLoading || loading || !newTermText.trim()}
                className="btn-hero h-10 px-5 text-sm flex items-center gap-1.5"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add Pointwise Term
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Pointwise Terms List */}
      <Card className="border-border/60 shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-elegant text-foreground">Terms & Conditions Pointwise Manager</CardTitle>
          <CardDescription>View, edit, delete, and reorder quotation rules and bullet lines.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm">Fetching list...</p>
            </div>
          ) : terms.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm italic">
              No terms or conditions configured. Add one above!
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {terms.map((term, index) => {
                const isEditing = editingId === term.id;
                
                return (
                  <div
                    key={term.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start justify-between hover:bg-muted/10 transition-colors"
                  >
                    {/* Bullet Number & Text */}
                    <div className="flex gap-3.5 items-start flex-grow w-full">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      
                      {isEditing ? (
                        <div className="w-full space-y-2">
                          <Textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            rows={3}
                            className="bg-card w-full text-sm resize-y"
                            disabled={actionLoading}
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelEdit}
                              disabled={actionLoading}
                              className="rounded-lg h-8 px-3 text-xs"
                            >
                              <X className="w-3.5 h-3.5 mr-1" />
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(term)}
                              disabled={actionLoading || !editingText.trim()}
                              className="btn-hero rounded-lg h-8 px-3 text-xs flex items-center gap-1"
                            >
                              {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-foreground leading-relaxed pt-0.5">
                          {term.bullet_point}
                        </p>
                      )}
                    </div>

                    {/* Action Controls */}
                    {!isEditing && (
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center ml-9 sm:ml-0">
                        {/* Move Up */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMove(index, 'up')}
                          disabled={index === 0 || actionLoading}
                          className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        
                        {/* Move Down */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMove(index, 'down')}
                          disabled={index === terms.length - 1 || actionLoading}
                          className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        
                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStartEdit(term)}
                          disabled={actionLoading}
                          className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary"
                          title="Edit Bullet"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>

                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(term.id)}
                          disabled={actionLoading}
                          className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive"
                          title="Delete Bullet"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
