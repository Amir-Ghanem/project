export interface FooterSection {
    id: string;
    companyDescription: string;
    logoUrl: string;
    copyrightText: string;
    buttonText: string;
  }
  
  // ApiResponse.ts
  export interface ApiResponse<T> {
    footerSection: T;
    isSuccess: boolean;
    errorCode: number;
    errors: string[];
  }