// Jury.ts
import { Competition } from "./competition"; // Assuming Competition model exists

export class Jury {
    juryID!: number;
    expertiseArea!: string;
    diploma!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    telNumber!: string;
    juryCV!: string;
    approved!: boolean;
    rejected!: boolean;
    competitionsManagedByJuries!: Competition[];
    imageUrl!:string;
    archived!:boolean;

    
    
}
