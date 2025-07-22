// BRANDBOT: SINGLE SOURCE OF BRAND TRUTH
// All downstream code must import from BRAND object. No hard-coded names, colours, phones, or emails.
// This file enables rapid re-skinning for future client transformations.

export const BRAND = {
  // Company Identity
  companyName: "Island Drains & Excavation",
  shortName: "Island Drains",
  legalName: "Island Drains & Excavation Ltd.",
  tagline: "Professional Drain Services & Excavation Solutions",
  
  // Domain Configuration
  primaryDomain: "islanddrainsandexcavation.ca",
  altDomains: ["www.islanddrainsandexcavation.ca"],
  
  // Contact Information
  primaryPhoneDisplay: "(250) 818-5611",
  primaryPhoneDial: "+12508185611",
  primaryEmail: "info@islanddrainsandexcavation.ca",
  
  // Service Area
  serviceArea: ["Victoria", "Southern Vancouver Island"],
  primaryLocation: "Victoria, BC",
  
  // Address (TODO: Get actual business address)
  addressLines: [
    "123 Example Rd", // TODO: Replace with actual address
    "Victoria, BC",
    "V8X 1A1" // TODO: Replace with actual postal code
  ],
  
  // Color Scheme - Marine/Professional Theme
  colours: {
    primary: "#0C4A6E",        // Deep marine blue
    secondary: "#FCD34D",      // Hazard yellow accent
    accent: "#0369A1",         // Bright blue
    neutralDark: "#1E1E1E",    // Dark gray
    neutralLight: "#F9FAFB",   // Light gray
    success: "#059669",        // Green for success states
    warning: "#D97706",        // Orange for warnings
  },
  
  // Logo & Asset Paths
  logoPaths: {
    full: "/images/ide-logo-full.svg",      // TODO: Replace when new logo ready
    mark: "/images/ide-mark.svg",           // TODO: Replace when new logo ready
    favicon: "/images/ide-favicon.png",     // TODO: Replace when new logo ready
    headerLogo: "/images/ide-header-logo.png" // TODO: Replace when new logo ready
  },
  
  // Social Media (Currently disabled per user request)
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    // All social links removed per user request
  },
  
  // Services Configuration
  services: {
    primary: [
      "Residential Drain Services",
      "Commercial Excavation", 
      "Emergency Drain Cleaning"
    ],
    categories: {
      residential: "Residential Services",
      commercial: "Commercial Services", 
              emergency: "Services"
    }
  },
  
  // Business Information
  businessInfo: {
    founded: null, // TODO: Add founding year if known
    yearsInBusiness: null, // TODO: Calculate from founding year
    serviceRadius: "Greater Victoria Area",
            emergencyService: false,
    licensed: true, // Assumed for professional service
    insured: true   // Assumed for professional service
  },
  
  // SEO & Meta Configuration  
  seo: {
    defaultTitle: "Island Drains & Excavation - Professional Drain Services Victoria BC",
            defaultDescription: "Professional drain cleaning, excavation and excavation services serving Victoria and Southern Vancouver Island. Licensed and insured.",
            keywords: ["drain cleaning", "excavation", "Victoria BC", "drain service", "residential drains", "commercial excavation"],
    locale: "en_CA",
    region: "BC",
    placename: "Victoria"
  }
};

// Validation function to ensure all required brand elements are configured
export function validateBrandConfig() {
  const errors = [];
  
  if (!BRAND.companyName) errors.push("Company name is required");
  if (!BRAND.primaryPhoneDisplay) errors.push("Primary phone is required");
  if (!BRAND.primaryEmail) errors.push("Primary email is required");
  if (!BRAND.primaryDomain) errors.push("Primary domain is required");
  
  if (errors.length > 0) {
    console.warn("Brand configuration incomplete:", errors);
    return false;
  }
  
  return true;
}

// Helper functions for common brand operations
export const brandHelpers = {
  // Format phone number for different contexts
  formatPhone: (context = "display") => {
    switch(context) {
      case "tel": return BRAND.primaryPhoneDial;
      case "display": return BRAND.primaryPhoneDisplay;
      case "plain": return BRAND.primaryPhoneDisplay.replace(/[^\d]/g, "");
      default: return BRAND.primaryPhoneDisplay;
    }
  },
  
  // Get full company name with legal suffix
  getFullLegalName: () => BRAND.legalName,
  
  // Get service area as formatted string
  getServiceAreaString: () => BRAND.serviceArea.join(" & "),
  
  // Get primary domain with protocol
  getFullDomain: (protocol = "https") => `${protocol}://${BRAND.primaryDomain}`,
  
  // Generate contact mailto link
  getMailtoLink: (subject = "") => {
    const subjectParam = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    return `mailto:${BRAND.primaryEmail}${subjectParam}`;
  }
};

// Development helper - log brand configuration
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  console.log("🎨 Brand Configuration Loaded:", BRAND);
  validateBrandConfig();
} 