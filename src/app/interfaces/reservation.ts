export interface IReservation {
  id: number
  placeId: number
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  eventName: string
  placeName?: string
}

export interface IResponseAPIReservation {
  success: boolean
  data: Data
  message: number
}

export interface Data {
  bookings: Booking[]
}

export interface Booking {
  id: number
  user_id?: number
  place_id: number
  event_name: string
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  status?: string
  place?: Place
  user?: User
}

export interface Place {
  id: number
  name: string
  description: string
  images: string[]
  capacity: number
  available_from: string
  available_to: string
  type: string
  active: number
  default_hours: string
  default_days: string[]
  created_at: string
  updated_at: string
  deleted_at: any
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
  deleted_at: any
}