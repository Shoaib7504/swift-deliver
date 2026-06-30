import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Shield, Bike } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import useAuth from '../hooks/UseAuth';

export default function RegisterPage() {
  const { user,registerUser, signInWithGoogle } = useAuth()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data.email, data.password);
      toast.success("Account created successfully!");
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Signed up with Google!");
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-bg-light dark:bg-bg-dark text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <div className="w-full max-w-md">

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="flex items-center space-x-2.5 group mb-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow transition-transform group-hover:scale-105">
              <Bike size={20} />
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
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
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

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-borderColor-light dark:bg-borderColor-dark" />
            <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">OR</span>
            <div className="flex-1 h-px bg-borderColor-light dark:bg-borderColor-dark" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold border border-borderColor-light dark:border-borderColor-dark bg-white dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {googleLoading ? (
              <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Continue with Google
          </button>
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
