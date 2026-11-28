export const WHATSAPP_URL =
  "https://wa.me/556293618627?text=Estou%20vindo%20do%20Site,%20preciso%20de%20ajuda";
export const NEXUS_URL = "https://mercurynexus.com.br";
export const INSTAGRAM_URL =
  "https://www.instagram.com/mercurygestora?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
export const CONTACT_EMAIL = "contato@mercurygestora.com.br";

declare global {
  interface Window {
    fbq?: (method: string, event: string, parameters?: Record<string, string>) => void;
  }
}

export function trackInstitutionalEvent(
  event: "Contact" | "ViewContent" | "Lead",
  contentName: string,
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, {
      content_name: contentName,
      content_category: "Institucional",
    });
  }
}
