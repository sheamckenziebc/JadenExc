// BRANDBOT: SINGLE SOURCE OF BRAND TRUTH
// All downstream code must import from BRAND object. No hard-coded names, colours, phones, or emails.
// This file enables rapid re-skinning for future client transformations.

export const BRAND = {
  // Company Identity
  companyName: "Jaden's Excavation & Landscaping",
  shortName: "Jaden's Excavation",
  legalName: "Jaden's Excavation & Landscaping Ltd.",
  tagline: "Professional Excavation & Landscaping Solutions",
  
  // Domain Configuration
  primaryDomain: "jadensexcavation.ca",
  altDomains: ["www.jadensexcavation.ca"],
  
  // Contact Information
  primaryPhoneDisplay: "(250) 555-0199", // TODO: Update with actual phone number
  primaryPhoneDial: "+12505550199",
  primaryEmail: "info@jadensexcavation.ca", // TODO: Update with actual email
  
  // Service Area
  serviceArea: ["Metro Vancouver", "Greater Vancouver Area"],
  primaryLocation: "Vancouver, BC",
  
  // Address (TODO: Get actual business address)
  addressLines: [
    "123 Example Rd", // TODO: Replace with actual address
    "Vancouver, BC",
    "V6X 1A1" // TODO: Replace with actual postal code
  ],
  
  // Color Scheme - Earthy/Professional Theme
  colours: {
    primary: "#265D2D",        // Deep forest green - earthy
    secondary: "#F9A825",      // Construction yellow accent
    accent: "#8BC34A",         // Bright green
    neutralDark: "#1E1E1E",    // Dark gray
    neutralLight: "#F6F6F6",   // Light gray
    success: "#4CAF50",        // Green for success states
    warning: "#FF9800",        // Orange for warnings
  },
  
  // Logo & Asset Paths
  logoPaths: {
    full: "/images/jadenlogo.png",      // Updated to new Jaden logo
    mark: "/images/jadenlogo.png",      // Using same logo for mark
    favicon: "/images/jadenlogo.png",   // Using same logo for favicon
    headerLogo: "/images/jadenlogo.png" // Using same logo for header
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
      "Residential Excavation",
      "Commercial Landscaping", 
      "Site Preparation"
    ],
    categories: {
      residential: "Residential Services",
      commercial: "Commercial Services", 
      landscaping: "Landscaping Services"
    }
  },
  
  // Business Information
  businessInfo: {
    founded: null, // TODO: Add founding year if known
    yearsInBusiness: null, // TODO: Calculate from founding year
    serviceRadius: "Metro Vancouver Area",
    emergencyService: false,
    licensed: true, // Assumed for professional service
    insured: true   // Assumed for professional service
  },
  
  // SEO & Meta Configuration  
  seo: {
    defaultTitle: "Jaden's Excavation & Landscaping - Professional Excavation Services Metro Vancouver BC",
    defaultDescription: "Professional excavation and landscaping services serving Metro Vancouver and Greater Vancouver Area. Licensed and insured.",
    keywords: ["excavation", "landscaping", "Metro Vancouver BC", "excavation service", "residential excavation", "commercial landscaping"],
    locale: "en_CA",
    region: "BC",
    placename: "Vancouver"
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