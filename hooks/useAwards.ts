// import { useQuery } from "@tanstack/react-query";

export interface Award {
  id: number;
  name: string;
  submitterType: string;
  dateSubmitted: string;
  status: string;
  awardId: number;
  awardTitle: string;
  hasFile: boolean;
  fileUrl?: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AwardsResponse {
  data: Award[];
  pagination: PaginationData;
}

async function fetchAwards(endpoint: string, page = 1, limit = 20): Promise<AwardsResponse> {
  const res = await fetch(`${endpoint}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch awards");
  return res.json();
}

export function usePendingAwards(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["awards", "pending", page, limit],
    queryFn: () => fetchAwards("/api/pendingAwards", page, limit),
  });
}

export function useAllAwards(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["awards", "all", page, limit],
    queryFn: () => fetchAwards("/api/admin/get-all-awards/route", page, limit),
  });
}

export function useAcceptedForms(userId: string, submitterType: string) {
  return useQuery({
    queryKey: ["awards", "accepted", userId, submitterType],
    queryFn: async () => {
      const res = await fetch("/api/get/accepted-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, submitterType }),
      });
      if (!res.ok) throw new Error("Failed to fetch accepted forms");
      return res.json();
    },
    enabled: !!userId && !!submitterType,
  });
}

export function useRejectedForms(userId: string, submitterType: string) {
  return useQuery({
    queryKey: ["awards", "rejected", userId, submitterType],
    queryFn: async () => {
      const res = await fetch("/api/get/rejected-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, submitterType }),
      });
      if (!res.ok) throw new Error("Failed to fetch rejected forms");
      return res.json();
    },
    enabled: !!userId && !!submitterType,
  });
}
