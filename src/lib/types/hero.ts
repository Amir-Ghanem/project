export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string | null;
  primaryButtonText: string | null;
  primaryButtonUrl: string | null;
  secondaryButtonText: string | null;
  secondaryButtonUrl: string | null;
  isActive: boolean;
  pageIdentifier: string;
  status: 'new' | 'existing'; // Add status
}

export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  errorCode: number;
  errors: string[];
  heroSections?: { items: T[] };
  heroSection?: T;
}