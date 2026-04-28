import { createContext } from "react";
import { ServiceContainer } from "@/app/dependency-injection/create-service-container";

export const ServiceContainerContext = createContext<ServiceContainer | null>(null);

