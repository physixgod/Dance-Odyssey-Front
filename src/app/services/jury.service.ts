import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { JuryManager } from 'src/app/models/jury1';
import { Competition } from '../models/competition';
import { Group } from '../models/group';
import { catchError,map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Event} from '../models/event';
import { Dancer } from '../models/dancer';
@Injectable({
  providedIn: 'root'
})
export class JuryService {
  private baseURL = "http://localhost:8086/jury/";

  constructor(private http: HttpClient) { }

  getImageForJury(id: number): Observable<Blob> {
    const url = `${this.baseURL}/${id}/image`; // Update the URL to match the API endpoint for fetching jury images
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        catchError((error: any) => {
          console.error(`An error occurred: ${error.message}`);
          return throwError('Image retrieval failed');
        })
      );
  }
  
  

  uploadImage(file: File, juryId: number): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
  
    return this.http.post<any>(`${this.baseURL}uploadImage/${juryId}`, formData, { responseType: 'text' as 'json' }).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }
  
  
    addJury(j:JuryManager):Observable<JuryManager>{
        return this.http.post<JuryManager>(this.baseURL+"addJury",j)
      }
      getAllJuries(): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(this.baseURL + "getAll");
      }  

      approveJury(id: number): Observable<any> {
        return this.http.put<any>(`${this.baseURL}approvejury/${id}`, null);
      }
      
      rejectJury(id: number): Observable<any> {
        return this.http.put<any>(`${this.baseURL}rejectjury/${id}`, null);
      }

      getAllCompetitions():Observable<Competition[]>{
        return this.http.get<Competition[]>(this.baseURL+"competitions")
  
      }
      getApprovedJuries(): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(this.baseURL + "showApprovedJuries");
      }
      showNotAffectedJuries(competitionId: number): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(`${this.baseURL}showNotAffectedJuries/${competitionId}`);
      }
      setJuries(idCompetition: number, idJuries: number): Observable<void> {
        return this.http.post<void>(`${this.baseURL}setJury/${idCompetition}/${idJuries}`, null);
      }
      showAffectedJuries(idCompetition: number): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(`${this.baseURL}showAffectedJuries/${idCompetition}`);
      }
      searchJuryByName(name: string): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(`${this.baseURL}SearchJuryByName/${name}`);
      }
      getJuriesByName(idCompetition: number, name: string): Observable<JuryManager[]> {
        return this.http.get<JuryManager[]>(`${this.baseURL}SearchJuries/${idCompetition}/${name}`);
      }
      private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
    
        if (error instanceof HttpErrorResponse) {
          console.error(`Status: ${error.status}, ${error.statusText}`);
          console.error('Response body:', error.error);
    
          const errorMessage = error.error && error.error.error ? error.error.error : 'Something went wrong';
    
          return throwError(errorMessage);
        }
    
        return throwError('Something went wrong');
      }
      
      uploadExcelFile(competitionId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Competition>(`${this.baseURL}${competitionId}/uploadExcel`, formData);
  }

   /*getParticipantScores(file: File): Observable<Map<string, number>> {
    return new Observable(observer => {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const data: ArrayBuffer = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
        const sheetName: string = workbook.SheetNames[0];
        const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        const participantScores: Map<string, number> = new Map<string, number>();

        XLSX.utils.sheet_to_json(sheet, { header: 1 }).forEach((row: unknown) => {
          const [participantName, score] = row as [string, number];
      
          // Now you can safely use participantName and score
      });

        observer.next(participantScores);
        observer.complete();
      };
      reader.onerror = (error) => observer.error(error);
      reader.readAsArrayBuffer(file);
    });
  }*/
  uploadScoreFile(file: File): Observable<Map<string, number>> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post<Map<string, number>>(`${this.baseURL}Noteparticipants`, formData);
  }

  getMyJuryCompetitions(idJury: number): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${this.baseURL}MyJuryCompetition/${idJury}`);
  }
  downloadExcel(competitionId: number): Observable<Blob> {
    const url = `${this.baseURL}${competitionId}/downloadExcel`;

    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        catchError((error: any) => {
          console.error(`An error occurred: ${error.message}`);
          return throwError('Excel file retrieval failed');
        })
      );
  }
  
  getParticipantDetails(participantId: number): Observable<any> {
    console.log("gg");
    return this.http.get(`${this.baseURL}participants/${participantId}/details`);
  }
  getCompetitionName(competitionId: number): Observable<string> {
    const url = `${this.baseURL}participants/getCompetitionName/${competitionId}`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' });
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.baseURL + "createGroup", group); // Adjust the URL as needed
  }

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseURL+"Allgroups");
  }

  joinGroup(groupId: number, dancerId: number): Observable<Dancer> {
    return this.http.post<Dancer>(`${this.baseURL}join-groups/${groupId}/${dancerId}`, null);
  }

  getDancersInGroup(groupId: number): Observable<Dancer[]> {
    return this.http.get<Dancer[]>(`${this.baseURL}GroupMembers/${groupId}`);
  }

  leaveGroup(groupId: number, dancerId: number): Observable<Dancer> {
    const url = `${this.baseURL}leaveGroups/${groupId}/${dancerId}`;
    return this.http.delete<Dancer>(url);
  }
  suggestGroupsBasedOnAnswers(ageRange: string, danceStyles: string, diverseAgeRepresentation: boolean, beginnerFriendly: boolean, mentorshipProgram: boolean): Observable<Group[]> {
    const url = `${this.baseURL}getDesiredGroups`;
    const params = new HttpParams()
      .set('ageRange', ageRange)
      .set('danceStyles', danceStyles)
      .set('diverseAgeRepresentation', diverseAgeRepresentation.toString())
      .set('beginnerFriendly', beginnerFriendly.toString())
      .set('mentorshipProgram', mentorshipProgram.toString());
  
    return this.http.get<Group[]>(url, { params });
  
}


getAllEvents(): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.baseURL}AllEvent`);
}

addWorkshop(workshop: any, idGroup: number): Observable<any> {
  return this.http.post(`${this.baseURL}addworkshop/${idGroup}`, workshop);
  }

  registerDancerEvent(idDancer: number, idEvent: number): Observable<string> {
    return this.http.post<string>(`${this.baseURL}registerDancerEvent/${idDancer}/${idEvent}`, null);
  }
} 