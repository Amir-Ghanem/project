export interface CEOSection {
    id: string;
    title: string;
    image: string;
    describtion: string;
    name: string;
    position : string;
    pageIdentifier : string,
  }
  
  // ApiResponse.ts
  export interface ApiResponse<T> {
    ceo: T;
    isSuccess: boolean;
    errorCode: number;
    errors: string[];
  }