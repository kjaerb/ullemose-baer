import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPropertyByString<T>(
  obj: Record<string, unknown>,
  propertyString: string
): T | undefined {
  const propertyArray = propertyString.split(".");

  let value: unknown = obj;
  for (const property of propertyArray) {
    if (value && typeof value === "object" && property in value) {
      value = (value as Record<string, unknown>)[property];
    } else {
      return undefined; // Property not found
    }
  }

  return value as T;
}
