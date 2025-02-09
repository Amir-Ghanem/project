export interface Statistic {
    id: string;
    title: string;
    value: string;
  }
  
  export interface ApiResponse<T> {
    isSuccess: boolean;
    errorCode: string;
    errors: string[];
    statistics?: {
      items: T[];
      pageNumber: number;
      totalPages: number;
      totalCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  }
  
  export interface CreateStatisticRequest {
    title: string;
    value: string;
  }
  