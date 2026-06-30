import { Link } from 'react-router-dom';
import { Bike } from 'lucide-react';
import useAuth from '../hooks/UseAuth';
import UserDropdown from './user-dropdown';
import Button from './ui/button';

export function SiteHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/70 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform group-hover:scale-105">
              <Bike className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Swift
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <a href="#coverage" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Coverage</a>
          </nav>
        </div>

        {/* Action Button / Dropdown */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="hidden sm:inline-block">
                <Button size="sm" variant="ghost" className="text-sm font-semibold cursor-pointer">
                  Merchant Portal
                </Button>
              </Link>
              <UserDropdown />
            </>
          ) : (
            <>
              <Link to="/login">
                <Button size="sm" variant="ghost" className="text-sm font-semibold cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-gradient-brand text-white border-0 font-semibold shadow-glow hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

