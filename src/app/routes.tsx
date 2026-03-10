import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import VirtualTryOnPage from "./pages/VirtualTryOnPageEnhanced";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import CommunityGuidelinesPage from "./pages/CommunityGuidelinesPage";
import InvestorRelationsPage from "./pages/InvestorRelationsPage";
import SupportPage from "./pages/SupportPage";
import PartnerWithUsPage from "./pages/PartnerWithUsPage";
import BrandIntegrationPage from "./pages/BrandIntegrationPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/blog/BlogArticlePage";
import Sitemap from "./components/Sitemap";
import SEOAuditPage from "./pages/SEOAuditPage";
import RootLayout from "./layouts/RootLayout";
import BrandDashboardLayout from "./layouts/BrandDashboardLayout";
import AdminPanelLayout from "./layouts/AdminPanelLayout";

// Brand Dashboard Pages
import BrandOverviewPage from "./pages/brand/BrandOverviewPage";
import GarmentsPage from "./pages/brand/GarmentsPage";
import JobsPage from "./pages/brand/JobsPage";
import APIKeysPage from "./pages/brand/APIKeysPage";
import TeamPage from "./pages/brand/TeamPage";
import AnalyticsPage from "./pages/brand/AnalyticsPage";
import SettingsPage from "./pages/brand/SettingsPage";
import SubscriptionPage from "./pages/brand/SubscriptionPage";
import PaymentPage from "./pages/brand/PaymentPage";

// Admin Panel Pages
import TenantsPage from "./pages/admin/TenantsPage";
import AllJobsPage from "./pages/admin/AllJobsPage";
import SystemHealthPage from "./pages/admin/SystemHealthPage";
import BillingPage from "./pages/admin/BillingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "signup", Component: SignUpPage },
      { path: "login", Component: LoginPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "shop", Component: ShopPage },
      { path: "product/:id", Component: ProductPage },
      { path: "try-on", Component: VirtualTryOnPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "order-confirmation", Component: OrderConfirmationPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "partner-with-us", Component: PartnerWithUsPage },
      { path: "brand-integration", Component: BrandIntegrationPage },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
      { path: "terms-and-conditions", Component: TermsAndConditionsPage },
      { path: "community-guidelines", Component: CommunityGuidelinesPage },
      { path: "investor-relations", Component: InvestorRelationsPage },
      { path: "support", Component: SupportPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogArticlePage },
      { path: "sitemap", Component: Sitemap },
      { path: "seo-audit", Component: SEOAuditPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/brand",
    Component: BrandDashboardLayout,
    children: [
      { path: "dashboard", Component: BrandOverviewPage },
      { path: "garments", Component: GarmentsPage },
      { path: "jobs", Component: JobsPage },
      { path: "api-keys", Component: APIKeysPage },
      { path: "team", Component: TeamPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "settings", Component: SettingsPage },
      { path: "subscription", Component: SubscriptionPage },
      { path: "payment", Component: PaymentPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminPanelLayout,
    children: [
      { path: "tenants", Component: TenantsPage },
      { path: "jobs", Component: AllJobsPage },
      { path: "health", Component: SystemHealthPage },
      { path: "billing", Component: BillingPage },
    ],
  },
]);