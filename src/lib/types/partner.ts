export interface Partner {
    id: string;
    name: string;
    websiteUrl: string;
    partnerType: string;
    image: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    displayOrder: number;
  }
  
  export interface ApiResponse<T> {
    isSuccess: boolean;
    errorCode: string;
    errors: string[];
    partners?: { 
      items: T[];
      pageNumber: number;
      totalPages: number;
      totalCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  }
  