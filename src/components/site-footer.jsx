import { Link } from 'react-router-dom';
import { Bike, ShieldCheck, Leaf } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t bg-card mt-16 transition-colors">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1 text-left">
            <Link to="/" className="flex items-center space-x-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
                <Bike className="h-4 w-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">Swift</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              One vibrant app for food, groceries and parcels. Delivering in minutes with a happier rider network.
            </p>
          </div>
          
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Deliveries</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground transition-colors">Food Delivery</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Grocery Express</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Parcel Courier</a></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Rider Network</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Sustainability</h4>
            <div className="space-y-3 text-xs text-muted-foreground">
              <p className="flex items-center">
                <Leaf size={14} className="text-success mr-1.5" />
                100% Carbon Neutral Delivery
              </p>
              <p className="flex items-center">
                <ShieldCheck size={14} className="text-success mr-1.5" />
                WCAG 2.1 AA Compliant
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Swift Inc. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
