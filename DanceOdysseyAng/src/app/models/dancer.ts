export interface Dancer {
    dancerId?: number;
    firstName: string;
    lastName: string;
    password: string;
    points: number;
    danceStyle: string; // Or you can use the DanceStyle enum if you have it defined in Angular
    experienceLevel: string; // Or you can use the ExperienceLevel enum if you have it defined in Angular
    email: string;
    telNum: string;
    gamePlayed: boolean;
    
  }
  