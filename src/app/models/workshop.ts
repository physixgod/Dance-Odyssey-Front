export class Workshop {
    id: number;
    name: string;
    date: string; // Assuming date will be received as a string in ISO format (e.g., "2024-05-10")
    location: string;
    description: string;
  
    constructor(id: number, name: string, date: string, location: string, description: string) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.location = location;
      this.description = description;
    }
  }