import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, ArrowRight, Sparkles, Bike } from "lucide-react";

import { useAuth } from "../context/auth-context";
import Input from "../components/ui/input";
import Button from "../components/ui/button";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = (data) => {
    console.log("Login Form Data Submitted:", data);
    setIsLoading(true);
    setTimeout(() => {
      const success = login(data.email, data.password);
      setIsLoading(false);
      if (success) {
        navigate("/dashboard");
      }
    }, 800);
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
            onSubmit={handleSubmit(onSubmit)}
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