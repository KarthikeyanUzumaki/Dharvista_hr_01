import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4"> Dharvista</h3>
            <p className="text-primary-foreground/80 max-w-md">
              A leading HR consultancy connecting exceptional talent with world-class organizations. 
              We believe in building lasting partnerships that drive success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Current Jobs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>3/666, A-1, M.D.R Nagar East<br />
              Aruppukottai, Tamil Nadu</li>
              <li>hr@ Dharvista.com</li>
              <li>+91 80564 79722</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()}  Dharvista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
