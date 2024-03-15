export interface GetTrackResponse {
  code: string;
  service: string;
  host: string;
  quantity: number;
  events: Event[];
  time: number;
  lastEvent: Date;
}

export interface Event {
  date: Date;
  location: string;
  status: string;
}
