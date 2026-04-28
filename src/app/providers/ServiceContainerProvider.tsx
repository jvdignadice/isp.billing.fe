import { PropsWithChildren, useMemo } from "react";
import {
  createServiceContainer,
} from "@/app/dependency-injection/create-service-container";
import { ServiceContainerContext } from "@/app/providers/service-container.context";

export function ServiceContainerProvider({ children }: PropsWithChildren) {
  const serviceContainer = useMemo(createServiceContainer, []);

  return (
    <ServiceContainerContext.Provider value={serviceContainer}>
      {children}
    </ServiceContainerContext.Provider>
  );
}
