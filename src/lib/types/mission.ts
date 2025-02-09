export interface Mission {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    iconUrl: string | null;
  }
  
  export interface ApiResponse<T> {
    isSuccess: boolean;
    errorCode: string;
    errors: string[];
    missions?: {
      items: T[];
      pageNumber: number;
      totalPages: number;
      totalCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  }

