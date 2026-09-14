export type CarStatus = "incoming" | "in_progress" | "ready" | "outgoing";

export const CAR_STATUS_LABEL: Record<CarStatus, string> = {
  incoming: "Incoming",
  in_progress: "In progress",
  ready: "Ready",
  outgoing: "Outgoing",
};

export const PHOTO_ANGLES = [
  { key: "front", label: "Front", instruction: "Line up the front bumper and grille, straight on." },
  { key: "back", label: "Back", instruction: "Stand behind the car, center the rear bumper." },
  { key: "left", label: "Left side", instruction: "Step back and capture the full left side profile." },
  { key: "right", label: "Right side", instruction: "Step back and capture the full right side profile." },
  { key: "dashboard", label: "Dashboard", instruction: "Open the driver door and photograph the odometer." },
  { key: "plate", label: "Registration plate", instruction: "Get close enough that the plate is easy to read." },
] as const;

export type PhotoAngleKey = (typeof PHOTO_ANGLES)[number]["key"];

export interface Car {
  id: string;
  registration_number: string;
  make: string | null;
  model: string | null;
  year: number | null;
  customer_name: string | null;
  customer_phone: string | null;
  status: CarStatus;
  intake_notes: string | null;
  price: number | null;
  intake_date: string;
  outgoing_date: string | null;
  created_by: string | null;
  created_at: string;
}

export interface CarStamp {
  id: string;
  car_id: string;
  status: CarStatus;
  note: string | null;
  created_by: string | null;
  created_at: string;
}

export interface CarPart {
  id: string;
  car_id: string;
  part_name: string;
  cost: number | null;
  installed_at: string;
  notes: string | null;
}

export interface CarPhoto {
  id: string;
  car_id: string;
  angle: PhotoAngleKey;
  storage_path: string;
  created_at: string;
}
