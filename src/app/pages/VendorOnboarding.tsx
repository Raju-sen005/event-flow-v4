import React from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { BackButton } from '../components/BackButton';
import { useAuth } from '../context/AuthContext';

export const VendorOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data: any) => {
    completeOnboarding(data);
    navigate('/preferences');
  };

  const serviceType = watch('serviceType');
  const experience = watch('experience');

  return (
    <AuthLayout
      title="Vendor Profile Setup"
      subtitle="Let's set up your service profile"
    >
      <div className="mb-6">
        <BackButton to="/role-selection" />
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" placeholder="Your Business Name" {...register('businessName')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Category</Label>
          <Select value={serviceType} onValueChange={(value) => setValue('serviceType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="catering">Catering</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="venue">Venue</SelectItem>
              <SelectItem value="decoration">Decoration</SelectItem>
              <SelectItem value="music">Music/DJ</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Select value={experience} onValueChange={(value) => setValue('experience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<1">Less than 1 year</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5-10">5-10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Cities You Operate In</Label>
          <Input id="location" placeholder="e.g., New York, Los Angeles" {...register('location')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Brief Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Tell us about your services..."
            rows={3}
            {...register('description')}
          />
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
          Continue
        </Button>

        <button
          type="button"
          onClick={() => navigate('/preferences')}
          className="text-sm text-gray-600 hover:text-gray-800 w-full text-center"
        >
          Complete later
        </button>
      </form>
    </AuthLayout>
  );
};