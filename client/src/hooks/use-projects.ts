import { useQuery } from "@tanstack/react-query";
import { api, buildUrl, type ProjectsQueryParams } from "@shared/routes";

export function useProjects(params?: ProjectsQueryParams) {
  // Construct query key that includes all params to ensure caching works correctly
  const queryKey = [api.projects.list.path, params];

  return useQuery({
    queryKey,
    queryFn: async () => {
      // Build query string manually or use URLSearchParams
      const url = new URL(api.projects.list.path, window.location.origin);
      if (params) {
        if (params.category) url.searchParams.append("category", params.category);
        if (params.type) url.searchParams.append("type", params.type);
        if (params.isFeatured !== undefined) url.searchParams.append("isFeatured", String(params.isFeatured));
      }

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch projects");
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: [api.projects.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.projects.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch project");
      return api.projects.get.responses[200].parse(await res.json());
    },
  });
}
