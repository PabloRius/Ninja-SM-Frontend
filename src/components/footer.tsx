import { AboutLink } from "./links/about-link";
import { ContactLink } from "./links/contact-link";
import { CookiesLink } from "./links/cookies-link";
import { LogoLink } from "./links/logo-link";
import { PrivacyLink } from "./links/privacy-link";
import { TermsLink } from "./links/terms-link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background px-4 md:px-6">
      <div className="py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <LogoLink />
            <p className="text-sm text-muted-foreground">
              Compare prices across UK supermarkets and find the best deals.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <AboutLink muted />
              </li>
              <li></li>
              <li>
                <ContactLink muted />
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2">
              <li>
                <PrivacyLink />
              </li>
              <li>
                <TermsLink />
              </li>
              <li>
                <CookiesLink />
              </li>
            </ul>
          </div>

          {/* <div className="space-y-3">
            <h3 className="text-sm font-medium">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://twitter.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://facebook.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SM Ninja. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
