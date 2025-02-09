// NewsResponse.ts
export interface NewsItem {
    id: string;
    title: string;
    content: string;
    publishDate: string; 
    isPublished: boolean;
    summary: string;
    author: string;
    images: string[];
    htmlContent:string;
  }
  
  export interface ApiResponse<T> {
    isSuccess: boolean;
    errorCode: number;
    errors: string[];
    newsList?: { items: T[]; pageNumber: number; totalPages: number; totalCount: number; hasPreviousPage: boolean; hasNextPage: boolean };
    news?: T;
  }
  