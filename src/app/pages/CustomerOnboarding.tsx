import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { BackButton } from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Users as UsersIcon, DollarSign } from 'lucide-react';

export const CustomerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [planningNow, setPlanningNow] = useState<string>('');
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data: any) => {
    completeOnboarding({ ...data, planningNow });
    navigate('/preferences');
  };

  const eventType = watch('eventType');
  const eventDate = watch('eventDate');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const budget = watch('budget');

  return (
    <AuthLayout
      title="Tell Us About Your Events"
      subtitle="Help us personalize your experience"
    >
      {step === 1 && (
        <div className="mb-6">
          <BackButton to="/role-selection" />
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-5">
            <div className="space-y-3">
              <Label>What type of events do you want to create?</Label>
              <RadioGroup value={eventType} onValueChange={(value) => setValue('eventType', value)}>
                {['Wedding', 'Birthday', 'Corporate', 'Personal / Other'].map((type) => (
                  <div key={type} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value={type.toLowerCase()} id={type} />
                    <Label htmlFor={type} className="cursor-pointer flex-1">{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Are you planning an event now?</Label>
              <RadioGroup value={planningNow} onValueChange={setPlanningNow}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="cursor-pointer flex-1">Yes, I'm planning an event</Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="cursor-pointer flex-1">No, just exploring</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="button"
              onClick={() => planningNow === 'yes' ? setStep(2) : handleSubmit(onSubmit)()}
              disabled={!eventType || !planningNow}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {planningNow === 'yes' ? 'Continue' : 'Complete Setup'}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Expected Event Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="eventDate"
                  type="date"
                  className="pl-10"
                  {...register('eventDate')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">City / Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="location"
                  placeholder="e.g., New York"
                  className="pl-10"
                  {...register('location')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestCount">Estimated Guest Count</Label>
              <Select value={guestCount} onValueChange={(value) => setValue('guestCount', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guest count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-50">0-50 guests</SelectItem>
                  <SelectItem value="51-100">51-100 guests</SelectItem>
                  <SelectItem value="101-200">101-200 guests</SelectItem>
                  <SelectItem value="201-500">201-500 guests</SelectItem>
                  <SelectItem value="500+">500+ guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select value={budget} onValueChange={(value) => setValue('budget', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="<5000">Less than $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50000+">$50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full">
                Back
              </Button>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                Complete
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <button
            type="button"
            onClick={() => navigate('/preferences')}
            className="text-sm text-gray-600 hover:text-gray-800 w-full text-center"
          >
            Skip for now
          </button>
        )}
      </form>
    </AuthLayout>
  );
};