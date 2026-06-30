import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, ArrowRight, Sparkles, Bike } from "lucide-react";
import { toast } from "sonner";

import Input from "../components/ui/input";
import Button from "../components/ui/button";
import useAuth from "../hooks/UseAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, singInUser, signInWithGoogle } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      await singInUser(data.email, data.password);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
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
      toast.success("Logged in with Google!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setValue("email", "merchant@zapshift.com");
    setValue("password", "password");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-bg-light dark:bg-bg-dark text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center space-x-2.5 group mb-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow transition-transform group-hover:scale-105">
              <Bike size={20} />
            </div>

            <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
              ZapShift
            </span>
          </Link>

          <h2 className="text-xl font-bold text-center">
            Welcome back
          </h2>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
            Log in to manage your shipments and fulfillment
          </p>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card/60 dark:bg-zinc-900/60 backdrop-blur-md border border-borderColor-light dark:border-borderColor-dark shadow-xl text-left">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-4"
          >

            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="name@company.com"
              icon={Mail}
              value={emailValue}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 dark:text-neutral-400 pb-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-borderColor-light dark:border-borderColor-dark h-4 w-4"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-brand text-white font-semibold py-3.5 rounded-xl cursor-pointer"
            >
              Sign In
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-borderColor-light dark:bg-borderColor-dark" />
            <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">OR</span>
            <div className="flex-1 h-px bg-borderColor-light dark:bg-borderColor-dark" />
          </div>

          {/* Google Sign In */}
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

          {/* Demo Login */}
          <div className="mt-6 pt-6 border-t border-borderColor-light dark:border-borderColor-dark text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Fill Merchant Demo Credentials</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}