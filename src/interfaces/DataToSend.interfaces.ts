import { Data } from "./Data.interfaces";
import { TodaysPicks } from "./TodaysPicks.interfaces";

export interface DataToSend {
  day: string;
  showNext: boolean;
  data: Data[]
  picks: TodaysPicks[]
}