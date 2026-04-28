import { useQuery } from "@tanstack/react-query";
import { getHealth } from "@/features/health/api/get-health";
import { ApiClientError } from "@/shared/api/api-error";
import { HealthResponse } from "@/features/health/types/health.types";

export function useHealth() {
  return useQuery<HealthResponse, ApiClientError>({
    queryKey: ["health"],
    queryFn: getHealth,
  });
}
