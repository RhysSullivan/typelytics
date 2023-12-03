export type EventType = {
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

export type PostHogEventListResponse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: EventType[];
};
