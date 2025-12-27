import { useQuery } from "@tanstack/react-query";
import { mockSiteSettings } from "@/mock/siteSettings";

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      // Return mock site settings as Record<string, string> for compatibility
      return mockSiteSettings as Record<string, string>;
    },
  });
}

export function useSiteSetting(key: string) {
  const { data: settings, ...rest } = useSiteSettings();
  return {
    data: settings?.[key],
    ...rest,
  };
}
