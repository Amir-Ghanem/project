export interface TeamMember {
    id: string;
    name: string;
    position: string;
    imageUrl: string;
    linkedInUrl: string;
    email: string;
    fburl: string;
    displayOrder: number;
    isActive: boolean;
  }
  
  export interface ApiResponse<T> {
    isSuccess: boolean;
    errorCode: string;
    errors: string[];
    teamMembers: {
      items: T[];
      pageNumber: number;
      totalPages: number;
      totalCount: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  }