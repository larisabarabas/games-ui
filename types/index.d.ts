declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type TelemetryEvent = {
  event_name: string;
  enabled: boolean;
};

declare type DataTable = {
  pagination: Pagination;
  games: Game[];
};

declare type Game = {
  id: string;
  title: string;
  release_date: string;
  enabled: boolean;
  studio?: string;
  platform?: string;
  telemetry_events?: TelemetryEvent[];
};

declare type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
