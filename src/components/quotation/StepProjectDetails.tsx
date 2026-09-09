import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, MapPin, Building, Ruler, FileText } from 'lucide-react';

export interface ProjectDetailsData {
  name: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  area: string;
  description: string;
}

interface StepProjectDetailsProps {
  data: ProjectDetailsData;
  onChange: (field: keyof ProjectDetailsData, value: string) => void;
  hideHeader?: boolean;
}

export const StepProjectDetails: React.FC<StepProjectDetailsProps> = ({
  data,
  onChange,
  hideHeader = false,
}) => {
  return (
    <div className="space-y-5 animate-fade-up">
      {!hideHeader && (
        <div className="text-left mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Project & Contact Details
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-foreground/90">
            <User className="w-3.5 h-3.5 text-primary" />
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="e.g., Rajesh Patel"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="h-11 rounded-[20px] bg-card border-border/70 focus:border-primary focus:ring-primary/20 text-foreground transition-all placeholder:text-muted-foreground/45 placeholder:font-normal"
            required
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-foreground/90">
            <Mail className="w-3.5 h-3.5 text-primary" />
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g., rajesh@example.com"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="h-11 rounded-[20px] bg-card border-border/70 focus:border-primary focus:ring-primary/20 text-foreground transition-all placeholder:text-muted-foreground/45 placeholder:font-normal"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-foreground/90">
            <Phone className="w-3.5 h-3.5 text-primary" />
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g., +91 99090 94033"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="h-11 rounded-[20px] bg-card border-border/70 focus:border-primary focus:ring-primary/20 text-foreground transition-all placeholder:text-muted-foreground/45 placeholder:font-normal"
            required
          />
        </div>

        {/* Project Location */}
        <div className="space-y-1.5">
          <Label htmlFor="location" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-foreground/90">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Project Location / City <span className="text-destructive">*</span>
          </Label>
          <Input
            id="location"
            placeholder="e.g., Kalawad Road, Rajkot"
            value={data.location}
            onChange={(e) => onChange('location', e.target.value)}
            className="h-11 rounded-[20px] bg-card border-border/70 focus:border-primary focus:ring-primary/20 text-foreground transition-all placeholder:text-muted-foreground/45 placeholder:font-normal"
            required
          />
        </div>

        {/* Project Type */}
        <div className="space-y-1.5">
          <Label htmlFor="projectType" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-foreground/90">
            <Building className="w-3.5 h-3.5 text-primary" />
            Project Type
          </Label>
          <Select
            value={data.projectType}
            onValueChange={(val) => onChange('projectType', val)}
          >
            <SelectTrigger id="projectType" className="h-11 rounded-[20px] bg-card border-border/70 focus:border-primary focus:ring-primary/20 text-foreground">
              <SelectValue placeholder="Select space type" />
            </SelectTrigger>
            <SelectContent className="rounded-[20px]">
              <SelectItem value="residential">Residential (Apartment / Flat)</SelectItem>
              <SelectItem value="bungalow">Bungalow / Luxury Villa</SelectItem>
              <SelectItem value="commercial">Commercial / Corporate Office</SelectItem>
              <SelectItem value="retail">Retail Showroom / Shop</SelectItem>
              <SelectItem value="restaurant">Restaurant / Hospitality</SelectItem>
              <SelectItem value="renovation">Renovation & Remodel</SelectItem>
              <SelectItem value="new-construction">New Construction</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Approximate Area */}
        <div className="space-y-1.5">
          <Label htmlFor="area" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-foreground/90">
            <Ruler className="w-3.5 h-3.5 text-primary" />
            Approximate Area (sq.ft) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="area"
            type="number"
            min="1"
            placeholder="e.g., 500"
            value={data.area}
            onChange={(e) => onChange('area', e.target.value)}
            className="h-11 rounded-[20px] bg-card border-border/70 focus:border-primary focus:ring-primary/20 text-foreground transition-all placeholder:text-muted-foreground/45 placeholder:font-normal"
            required
          />
          <p className="text-[11px] text-muted-foreground">
            Used to calculate total price (Specifications + Labour: ₹17/sqft + Transport: ₹2/sqft).
          </p>
        </div>
      </div>

      {/* Description / Special Requests */}
      <div className="space-y-1.5 pt-1">
        <Label htmlFor="description" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-foreground/90">
          <FileText className="w-3.5 h-3.5 text-primary" />
          Project Notes / Design Preferences <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Feel free to share any specific room dimensions, ceiling height, lighting preferences..."
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={2}
          className="rounded-[20px] bg-card border-border/70 focus:border-primary focus:ring-primary/20 text-foreground transition-all min-h-[75px] placeholder:text-muted-foreground/45 placeholder:font-normal"
        />
      </div>
    </div>
  );
};
