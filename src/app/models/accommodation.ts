import { Dancer } from "./competition";

export class Accommodation {
    idAcc!: number;
    pricePerNight!: number;
    availableSlots!: number;
    location!: string;
    contact!: string;
    availability!: boolean;
    hoster!: Dancer;
    residents!: Dancer[];
    breakfeast!: boolean;
    lunch!: boolean;
    dinner!: boolean;
    breakfeastPrice!: number;
    lunchPrice!: number;
    dinnerPrice!: number;
  }