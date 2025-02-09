export interface ContactSection {
    id: string;
    title: string | null;
    subtitle: string | null;
    showMap: boolean;
    latitude: number;
    longitude: number;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    isActive: boolean;
    pageIdentifier: string;
  }
  
  export interface Request {
    id: string;
    name: string;
    email: string;
    subject: string;
    service: string;
    message: string;
    isRead: boolean;
  }
  
  export interface ApiResponse<T> {
    isSuccess: boolean;
    errorCode: number;
    errors: string[];
    contactSections?: { items: T[] };
    contactSection?: T;
    requests?: { items: T[] };
    request?: T;
  }