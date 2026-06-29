import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Shield, Bike } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth-context';
import Input from '../components/ui/input';
import Button from '../components/ui/button';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      tier: 'Standard'
    }
  });

  const nameValue = watch('name');
  const emailValue = watch('email');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const onSubmit = (data) => {
    console.log("Register Form Data Submitted:", data);
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const success = registerUser(data.name, data.email, data.password, data.tier);
      setIsLoading(false);
      if (success) {
        navigate('/dashboard');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-bg-light dark:bg-bg-dark text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center space-x-2.5 group mb-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow transition-transform group-hover:scale-105">
              <span className="font-extrabold text-xl"><Bike></Bike></span>
            </div>
            <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
              ZapShift
            </span>
          </Link>
          <h2 className="text-xl font-bold text-center">Create your account</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
            Join thousands of merchants shipping with ZapShift
          </p>
        </div>

        {/* Register Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card/60 dark:bg-zinc-900/60 backdrop-blur-md border border-borderColor-light dark:border-borderColor-dark shadow-xl text-left">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <Input
              id="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              icon={User}
              value={nameValue}
              error={errors.name?.message}
              {...register('name', {
                required: 'Full name is required'
              })}
            />

            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="name@company.com"
              icon={Mail}
              value={emailValue}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address'
                }
              })}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              value={passwordValue}
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              icon={Lock}
              value={confirmPasswordValue}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === passwordValue || 'Passwords do not match'
              })}
            />

            {/* Account Tier selector */}
            <div className="relative w-full mb-5">
              <label className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500 mb-1.5 pl-1">
                Select Account Tier
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
                  <Shield size={18} />
                </div>
                <select
                  className="w-full pl-11 pr-4 py-3.5 rounded-lg text-sm bg-neutral-100/50 dark:bg-neutral-800/40 text-neutral-800 dark:text-neutral-200 border border-borderColor-light dark:border-borderColor-dark focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all appearance-none cursor-pointer"
                  {...register('tier')}
                >
                  <option value="Starter">Starter (Pay as you go)</option>
                  <option value="Standard">Standard Merchant</option>
                  <option value="Pro Merchant">Pro Merchant (High volume)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-brand text-white border-0 font-semibold shadow-glow hover:scale-[1.01] active:scale-[0.99] py-3.5 rounded-xl cursor-pointer"
            >
              Sign Up
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in here
          </Link>
        </p>

      </div>
    </div>
  );
}
