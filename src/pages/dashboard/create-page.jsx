import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Truck, ArrowLeft, Info, HelpCircle, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/button';
import Input from '../../components/ui/input';
import { toast } from 'sonner';

export default function CreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      address: '',
      division: 'Dhaka',
      district: '',
      weight: 1,
      tier: 'standard',
      codAmount: 0
    }
  });

  // Watch fields for pricing calculations
  const watchedDivision = watch('division');
  const watchedWeight = watch('weight');
  const watchedTier = watch('tier');

  // Load locations
  useEffect(() => {
    Promise.all([
      fetch('/data/division.json').then(res => res.json()),
      fetch('/data/warehouses.json').then(res => res.json())
    ])
      .then(([divisionsData, warehousesData]) => {
        setDivisions(divisionsData);
        setWarehouses(warehousesData);
        
        // Setup initial districts for Dhaka
        const initialDistricts = [...new Set(warehousesData
          .filter(w => w.region.toLowerCase() === 'dhaka')
          .map(w => w.district))];
        setAvailableDistricts(initialDistricts);
        if (initialDistricts.length > 0) {
          setValue('district', initialDistricts[0]);
        }
      })
      .catch(err => console.error("Error loading location datasets:", err));
  }, [setValue]);

  // Update districts list when division changes
  useEffect(() => {
    if (!watchedDivision || warehouses.length === 0) return;
    
    const filteredDistricts = [...new Set(warehouses
      .filter(w => w.region.toLowerCase() === watchedDivision.toLowerCase())
      .map(w => w.district))];
    
    setAvailableDistricts(filteredDistricts);
    if (filteredDistricts.length > 0) {
      setValue('district', filteredDistricts[0]);
    } else {
      setValue('district', '');
    }
  }, [watchedDivision, warehouses, setValue]);

  // Calculate live price
  const calculateLivePrice = () => {
    const w = parseFloat(watchedWeight) || 0;
    const base = watchedTier === 'express' ? 120 : 60;
    const rate = watchedTier === 'express' ? 30 : 15;
    const divisionPremium = watchedDivision === 'Dhaka' ? 0 : 35;
    return base + (w * rate) + divisionPremium;
  };

  const onSubmit = (data) => {
    setLoading(true);
    // Simulate API dispatch latency
    setTimeout(() => {
      setLoading(false);
      toast.success(`Shipment created successfully! ID: ZP-${Math.floor(1000 + Math.random() * 9000)}`, {
        description: `Parcel booked for ${data.customerName} in ${data.district}. Dispatching shortly.`
      });
      navigate('/dashboard/shipments');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left pb-12">
      {/* Back button link */}
      <button
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center text-xs font-semibold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={14} className="mr-1" />
        Back to Dashboard
      </button>

      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <Truck size={20} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">Create Shipment</h1>
          <p className="text-xs text-neutral-400">Fill in recipient information and weight options to book a courier delivery.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Input Form Column (Takes 2 columns) */}
        <div className="md:col-span-2 space-y-5 p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 shadow-soft">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">Recipient Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="customerName"
              label="Recipient Full Name"
              placeholder="e.g. Adnan Chowdhury"
              error={errors.customerName?.message}
              {...register('customerName', {
                required: 'Recipient name is required',
                minLength: { value: 3, message: 'Name must be at least 3 characters' }
              })}
            />
            <Input
              id="customerPhone"
              label="Contact Phone Number"
              placeholder="e.g. 01712345678"
              error={errors.customerPhone?.message}
              {...register('customerPhone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                  message: 'Enter a valid Bangladeshi phone number'
                }
              })}
            />
          </div>

          <Input
            id="customerEmail"
            type="email"
            label="Email Address (Optional)"
            placeholder="e.g. customer@domain.com"
            error={errors.customerEmail?.message}
            {...register('customerEmail')}
          />

          <Input
            id="address"
            label="Street Address & Delivery Details"
            placeholder="e.g. House 24, Road 5, Block B, Uttara"
            error={errors.address?.message}
            {...register('address', {
              required: 'Delivery address is required',
              minLength: { value: 10, message: 'Address should be descriptive (min 10 chars)' }
            })}
          />

          <div className="border-t border-borderColor-light dark:border-borderColor-dark pt-5">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4">Location & Delivery Specifications</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Division */}
              <div className="space-y-1.5 text-left mb-4">
                <label className="text-xs font-semibold text-neutral-400">Recipient Division</label>
                <select
                  id="division"
                  className="w-full px-4 py-3.5 rounded-lg border border-borderColor-light dark:border-borderColor-dark bg-neutral-100/50 dark:bg-neutral-800/40 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-primary"
                  {...register('division')}
                >
                  {divisions.map((div, i) => (
                    <option key={i} value={div}>{div}</option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="space-y-1.5 text-left mb-4">
                <label className="text-xs font-semibold text-neutral-400">Recipient District</label>
                <select
                  id="district"
                  className="w-full px-4 py-3.5 rounded-lg border border-borderColor-light dark:border-borderColor-dark bg-neutral-100/50 dark:bg-neutral-800/40 text-sm text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-primary"
                  {...register('district', { required: 'Please select a district' })}
                >
                  {availableDistricts.map((dist, i) => (
                    <option key={i} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Weight */}
              <Input
                id="weight"
                type="number"
                step="0.1"
                label="Weight (kg)"
                placeholder="1"
                error={errors.weight?.message}
                {...register('weight', {
                  required: 'Weight is required',
                  min: { value: 0.1, message: 'Weight must be greater than 0' }
                })}
              />

              {/* COD cash collect amount */}
              <Input
                id="codAmount"
                type="number"
                label="Cash on Delivery (COD) Collection (৳)"
                placeholder="0"
                error={errors.codAmount?.message}
                {...register('codAmount', {
                  min: { value: 0, message: 'COD collected cannot be negative' }
                })}
              />
            </div>

            {/* Service Tier selection buttons */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-neutral-400">Delivery Tier Service</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`px-4 py-3.5 rounded-lg border text-xs font-bold flex flex-col justify-center items-center gap-1.5 transition-all cursor-pointer ${
                  watchedTier === 'standard'
                    ? 'border-primary bg-primary/5 text-primary dark:border-accent-light dark:bg-accent/15 dark:text-accent-light'
                    : 'border-borderColor-light dark:border-borderColor-dark text-neutral-500 hover:bg-neutral-50 dark:hover:bg-zinc-800/60'
                }`}>
                  <input
                    type="radio"
                    value="standard"
                    className="sr-only"
                    {...register('tier')}
                  />
                  <span>Standard Delivery</span>
                  <span className="text-[10px] text-neutral-400 font-medium">Takes 24–72 hours</span>
                </label>
                
                <label className={`px-4 py-3.5 rounded-lg border text-xs font-bold flex flex-col justify-center items-center gap-1.5 transition-all cursor-pointer ${
                  watchedTier === 'express'
                    ? 'border-primary bg-primary/5 text-primary dark:border-accent-light dark:bg-accent/15 dark:text-accent-light'
                    : 'border-borderColor-light dark:border-borderColor-dark text-neutral-500 hover:bg-neutral-50 dark:hover:bg-zinc-800/60'
                }`}>
                  <input
                    type="radio"
                    value="express"
                    className="sr-only"
                    {...register('tier')}
                  />
                  <span>Express Courier</span>
                  <span className="text-[10px] text-neutral-400 font-medium">Inside Dhaka: 4–6 hours</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Estimation Summary Box Column (Takes 1 column) */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-zinc-900/40 shadow-soft space-y-5">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white pb-3 border-b border-borderColor-light dark:border-borderColor-dark">
              Booking Invoice
            </h3>

            <div className="space-y-3.5 text-xs text-neutral-500">
              <div className="flex justify-between">
                <span>Base Transit Fee:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  ৳{watchedTier === 'express' ? 120 : 60}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Weight Surcharge ({watchedWeight} kg):</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  ৳{(parseFloat(watchedWeight) || 0) * (watchedTier === 'express' ? 30 : 15)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Inter-Division Surcharge:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  ৳{watchedDivision === 'Dhaka' ? 0 : 35}
                </span>
              </div>
              
              <div className="border-t border-borderColor-light dark:border-borderColor-dark pt-3 flex justify-between font-bold text-sm text-neutral-800 dark:text-white">
                <span>Total Delivery Fare:</span>
                <span className="text-primary dark:text-accent-light">
                  ৳{calculateLivePrice()}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full font-bold text-sm py-3.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950"
            >
              Confirm Dispatch
            </Button>
          </div>

          {/* Guidelines info */}
          <div className="p-4 rounded-xl border border-borderColor-light dark:border-borderColor-dark bg-neutral-50 dark:bg-zinc-900/30 space-y-3 text-xs leading-relaxed text-neutral-500">
            <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300 font-bold">
              <ShieldCheck size={16} className="text-success" />
              <span>Merchant Guarantee</span>
            </div>
            <p>
              We protect merchant inventory and guarantee 100% full reimbursement for damaged goods in transit. Ensure fragile items are padded safely.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
}
