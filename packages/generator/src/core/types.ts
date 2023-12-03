export type Property = {
  id: string;
  name: string;
  type: "date" | "number" | "string" | "boolean" | "unknown";
};

export type AnalyticsEvent = {
  name: string;
  id: string;
  properties: Property[];
};
