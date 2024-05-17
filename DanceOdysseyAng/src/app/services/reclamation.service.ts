import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation';

@Injectable({ providedIn: 'root' })
export class ReclamationService {
  private apiUrl = 'http://localhost:8086/reclamation/AddReclamation';
  private Url = 'http://localhost:8086/reclamation/Showall';
  private api = 'http://localhost:8086/reclamation/UpdateReclamation';
  private deleteUrl='http://localhost:8086/reclamation/deletereclamation';
  private convertToexcelUrl = 'http://localhost:8086/reclamation/export-to-excel';

  constructor(private http: HttpClient) { }

  addReclamation(reclamation: Reclamation, idDancer: number): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.apiUrl}/${idDancer}`, reclamation);
  }

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.Url);
  }

  updateReclamation(id: number, reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.api}/${id}`, reclamation);
  }
  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteUrl}/${id}`);
  }
  
  exportReclamationsToExcel(): Observable<Blob> {
    return this.http.get(`${this.convertToexcelUrl}`, { responseType: 'blob' });
  }
  
}
