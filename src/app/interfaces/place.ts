export interface IApiResponsePlaces {
  success: boolean
  data: Data
  message: number
}

export interface Data {
  places: IPlace | IPlace[]
  message: string
}

export interface IPlace {
  id: number;
  name: string;
  description: string;
  capacity: number;
  images: string[];
  available_from: string
  available_to: string
  type: string
  active: number
  default_hours: string
  default_days: string[]
}

export interface ISchedule {
  booked_schedule: IScheduleData[]
}
export interface IScheduleData {
  start_date: string
  end_date: string
  start_time: string
  end_time: string
}
  
