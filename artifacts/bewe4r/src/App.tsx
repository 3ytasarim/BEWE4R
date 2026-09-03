import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

// Layout
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PrintPage from "@/pages/deine-brand/Print";
import LabelPage from "@/pages/deine-brand/Label";
import SamplePage from "@/pages/deine-brand/Sample";
import MoqPage from "@/pages/deine-brand/Moq";
import PreOrderPage from "@/pages/deine-brand/PreOrder";
import LagerPage from "@/pages/deine-brand/Lager";
import LieferungPage from "@/pages/deine-brand/Lieferung";
import WeitereProduktePage from "@/pages/weitere-produkte/Index";
import ZipBagsPage from "@/pages/weitere-produkte/ZipBags";
import KartonagenPage from "@/pages/weitere-produkte/Kartonagen";
import MarketingEssentialsPage from "@/pages/weitere-produkte/MarketingEssentials";
import UeberUnsPage from "@/pages/UeberUns";
import KontaktPage from "@/pages/Kontakt";
import KatalogPage from "@/pages/Katalog";
import PricesShippingPage from "@/pages/PricesShipping";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy";
import LegalNoticePage from "@/pages/LegalNotice";
import TermsPage from "@/pages/Terms";
import AdminDashboardPage from "@/pages/admin/DashboardPage";
import AdminSeoPage from "@/pages/admin/SeoPage";
import AdminBrandsPage from "@/pages/admin/BrandsPage";
import AdminContactPage from "@/pages/admin/ContactPage";
import AdminWrapper from "@/pages/admin/AdminWrapper";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function Router() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/your-brand/print" component={PrintPage} />
          <Route path="/your-brand/label" component={LabelPage} />
          <Route path="/your-brand/sample" component={SamplePage} />
          <Route path="/your-brand/moq" component={MoqPage} />
          <Route path="/your-brand/pre-order" component={PreOrderPage} />
          <Route path="/your-brand/storage" component={LagerPage} />
          <Route path="/your-brand/delivery" component={LieferungPage} />

          <Route path="/brand-essentials" component={WeitereProduktePage} />
          <Route path="/brand-essentials/zip-bags" component={ZipBagsPage} />
          <Route path="/brand-essentials/mailer-bags" component={ZipBagsPage} />
          <Route path="/brand-essentials/boxes" component={KartonagenPage} />
          <Route path="/brand-essentials/marketing-essentials" component={MarketingEssentialsPage} />
          <Route path="/brand-essentials/thank-you-cards" component={MarketingEssentialsPage} />
          <Route path="/brand-essentials/stickers" component={MarketingEssentialsPage} />
          <Route path="/brand-essentials/customer-gifts" component={MarketingEssentialsPage} />

          <Route path="/e-catalog" component={KatalogPage} />
          <Route path="/about" component={UeberUnsPage} />
          <Route path="/about/prices-shipping" component={PricesShippingPage} />
          <Route path="/contact" component={KontaktPage} />
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route path="/legal-notice" component={LegalNoticePage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/admin" component={() => <AdminWrapper><AdminDashboardPage /></AdminWrapper>} />
          <Route path="/admin/seo" component={() => <AdminWrapper><AdminSeoPage /></AdminWrapper>} />
          <Route path="/admin/brands" component={() => <AdminWrapper><AdminBrandsPage /></AdminWrapper>} />
          <Route path="/admin/contact" component={() => <AdminWrapper><AdminContactPage /></AdminWrapper>} />

          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  // Bone light theme — remove any legacy dark class
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
