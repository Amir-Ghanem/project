export interface Career {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  position: string;
  links: string[]; // Updated to list of links
  isRead: boolean;
  cvurl: string; // New field for CV
  
  portfolioURL: string; // New field for portfolio images
  }
  
  export interface ApiResponse<T> {
    isSuccess: boolean;
    errorCode: number;
    errors: string[];
    careers?: { items: T[] };
    career?: T;
  }