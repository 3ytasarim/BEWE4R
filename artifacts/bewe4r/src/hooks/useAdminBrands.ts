import { useQuery } from "@tanstack/react-query";

type Brand = {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  year: string | null;
  dropCount: string | null;
  sortOrder: number | null;
};

export function useAdminBrands() {
  return useQuery<Brand[]>({
    queryKey: ["admin-brands"],
    queryFn: async () => {
      const res = await fetch("/api/admin/brands");
      if (!res.ok) throw new Error("Failed to fetch brands");
      return res.json();
    },
  });
}
