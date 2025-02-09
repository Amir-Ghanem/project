export interface Service {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  imageUrl: string | null;
  isActive: boolean;
  pageIdentifier: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  errorCode: number;
  errors: string[];
  services?: { items: T[] };
  service?: T;
}