export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
  is_active: boolean;
  wallet: number;
}

export interface IMovie {
  id: string;
  title: string;
  description: string;
  duration: number;
  release_date: Date;
  genre: string;
  poster_url: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ITheater {
  id: string;
  name: string;
  address: string;
  capacity: number;
  features: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface IShow {
  id: string;
  movie_id: number;
  theater_id: number;
  date: Date;
  time: string;
  ticket_price: number;
  booked_seats: number[];
  available_seats_count: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;

  //run time properties
  movie?: IMovie;
  theater: ITheater;
}

export interface seat {
  status: "sold" | "available" | "selected";
  row: number;
  number: number;
  price: number;
}

export interface IBooking {
  id: number;
  movie_id: number;
  theater_id: number;
  user_id: number;
  show_id: number;
  seat_numbers: number[];
  total_payed: number;
  status: "booked" | "refund";
  created_at: string;
  updated_at: string;

  //run time properties
  movie?: IMovie;
  theater?: ITheater;
  show?: IShow;
  user?: IUser;
}
