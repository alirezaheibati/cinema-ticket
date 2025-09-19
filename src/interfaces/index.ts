export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  created_at: string;
  updated_at: string;
  is_active: boolean;
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
