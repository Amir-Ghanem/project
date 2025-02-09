
  export interface Project {
    id: string;
    title: string;
    description: string;
    clientName: string;
    location: string;
    completionDate: string; // ISO 8601 date string
    category: string;
    scopeOfWork: string;
    isActive: boolean;
    projectImages: string[];
  }
  
  export interface ApiResponse <T>{
    isSuccess: boolean;
    errorCode: number;
    errors: string[];
    projects?: { items : T[] };
    project? : T
  }
  