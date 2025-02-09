// lib/types/teamSection.ts

export interface ApiResponse<T> {
    isSuccess: boolean;
    errorCode: string;
    errors: string[];
    teamSections: T;
  }
  
  export interface TeamSectionData {
    id: string | null;
    title: string;
    subtitle: string;
    description: string;
    isActive: boolean;
    buttonText: string;
    buttonURL: string;
    pageIdentifier: string;
  }
  
  export interface UpdateTeamSectionRequest {
    id: string | null;
    title: string;
    subtitle: string;
    description: string;
    isActive: boolean;
    buttonText: string;
    buttonURL: string;
    pageIdentifier: string;
  }
  