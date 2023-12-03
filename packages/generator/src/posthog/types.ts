export type PosthogEventType = {
  id: string;
  name: string;
  owner: null | string;
  description: null | string;
  created_at: string;
  updated_at: null | string;
  updated_by: null | string;
  last_seen_at: string;
  verified: null | boolean;
  verified_at: null | string;
  verified_by: null | string;
  is_action: boolean;
  post_to_slack: boolean;
  tags: string[];
};

export type PosthogPropertyType = "DateTime" | "String" | "Numeric" | "Boolean";

export type PostHogEndpoints = {
  event_definitions: {
    queryParams: undefined;
    response: {
      count: number;
      next: null | string;
      previous: null | string;
      results: PosthogEventType[];
    };
  };
  property_definitions: {
    queryParams?: {
      event_names: string[];
      filter_by_event_names: true;
    };
    response: {
      count: number;
      next: string | null;
      previous: string | null;
      results: Array<{
        id: string;
        name: string;
        is_numerical: boolean;
        property_type: PosthogPropertyType;
        tags: (string | null)[];
        is_seen_on_filtered_events: string;
      }>;
    };
  };
};
