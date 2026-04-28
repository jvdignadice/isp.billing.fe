import { useContext } from "react";
import { ServiceContainer } from "@/app/dependency-injection/create-service-container";
import { ServiceContainerContext } from "@/app/providers/service-container.context";

export function useServiceContainer(): ServiceContainer {
  const context = useContext(ServiceContainerContext);

  if (!context) {
    throw new Error("useServiceContainer must be used within ServiceContainerProvider.");
  }

  return context;
}
