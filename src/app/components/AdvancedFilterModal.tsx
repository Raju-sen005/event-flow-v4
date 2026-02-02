import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Filter, X, RotateCcw } from 'lucide-react';

export interface FilterField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number' | 'range';
  options?: { label: string; value: string }[];
  placeholder?: string;
}

interface AdvancedFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  fields: FilterField[];
  onApplyFilters?: (filters: Record<string, any>) => void;
  initialValues?: Record<string, any>;
}

export const AdvancedFilterModal: React.FC<AdvancedFilterModalProps> = ({
  open,
  onOpenChange,
  title = 'Advanced Filters',
  description = 'Refine your search with advanced filtering options',
  fields,
  onApplyFilters,
  initialValues = {},
}) => {
  const [filters, setFilters] = useState<Record<string, any>>(initialValues);

  const handleChange = (fieldId: string, value: any) => {
    setFilters(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleReset = () => {
    setFilters({});
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
    onOpenChange(false);
  };

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Select
              value={filters[field.id] || ''}
              onValueChange={(value) => handleChange(field.id, value)}
            >
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type="date"
              value={filters[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full"
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              value={filters[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full"
            />
          </div>
        );

      case 'range':
        return (
          <div key={field.id} className="space-y-2">
            <Label>{field.label}</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min"
                value={filters[`${field.id}_min`] || ''}
                onChange={(e) => handleChange(`${field.id}_min`, e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters[`${field.id}_max`] || ''}
                onChange={(e) => handleChange(`${field.id}_max`, e.target.value)}
              />
            </div>
          </div>
        );

      case 'text':
      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type="text"
              placeholder={field.placeholder}
              value={filters[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full"
            />
          </div>
        );
    }
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '' && v !== undefined).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#075056]" />
            {title}
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-[#FF5B04] text-white text-xs rounded-full">
                {activeFilterCount} active
              </span>
            )}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {fields.map(renderField)}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={activeFilterCount === 0}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <div className="flex-1" />
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="bg-[#075056] hover:bg-[#075056]/90 text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
