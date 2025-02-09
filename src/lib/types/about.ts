
export interface AboutSection {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    secondImageUrl: string;
    buttonText: string;
    buttonUrl: string;
    isActive: boolean;
    aboutList: string[];
    aboutListString: string;
    noOfYearsExp: string;
    noOfYearsExpLabel: string;
    pageIdentifier: "Home" | string; // Restrict to "Home" or other possible values
  }
  export interface ApiResponse <T>{
    isSuccess: boolean;
    errorCode: number;
    errors: string[];
    aboutSections?: { items : T[] };
    aboutSection? : T
  }
  