import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition';
import { Event } from '../models/event';
import { Accommodation } from '../models/accommodation';

@Injectable({
  providedIn: 'root'
})
export class EventService{
    private baseURL = "http://localhost:8086/event/"
  
    constructor(private http : HttpClient) { }
    addEvent(e:Event):Observable<Event[]>{
        return this.http.post<Event[]>(this.baseURL+"AddEvent",e)
      }
    getEvents():Observable<Event[]>{
        return this.http.get<Event[]>(this.baseURL+'ShowEvents')
      }
      addEventByDancer(idDancer: number, event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.baseURL}AddEventByDancer/${idDancer}`, event);
      }
      showMyCreatedEvents(idDancer: number): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.baseURL}MyCreatedEvents/${idDancer}`);
      }
      getEventById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.baseURL}getEventById/${id}`);
      }
      deleteEvent(id: number): Observable<void> {
        // Note: If your backend API expects a PUT request for deletion, make sure it returns an empty response.
        return this.http.put<void>(`${this.baseURL}DeleteEvent/${id}`, {});
      }
      getEventsNearby(yourLatitude: number, yourLongitude: number, maxDistance: number): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.baseURL}nearbyEvents?yourLatitude=${yourLatitude}&yourLongitude=${yourLongitude}&maxDistance=${maxDistance}`);
      }
      updateEventImage(id: number, image: File): Observable<Event> {
        const formData: FormData = new FormData();
        formData.append('image', image, image.name);
    
        return this.http.post<Event>(`${this.baseURL}uploadEventImage/image/${id}`, formData);
      }
      getEventImage(id: number): Observable<string> {
        return this.http.get(`${this.baseURL}getEventImage/${id}`, { responseType: 'text' });
      }
      registerDancerEvent(idDancer: number, idEvent: number): Observable<boolean> {
        return this.http.post<boolean>(`${this.baseURL}registerDancerEvent/${idDancer}/${idEvent}`, null);
  
      }
      addAcc(idDancer: number, idEvent: number, accommodation: Accommodation): Observable<Accommodation> {
        return this.http.post<Accommodation>(`${this.baseURL}AddACC/${idDancer}/${idEvent}`, accommodation);
      }
      getAccommodationsForEvent(eventId: number): Observable<Accommodation[]> {
        return this.http.get<Accommodation[]>(`${this.baseURL}ShowAcc/${eventId}`);
      }


    showAccPrice(idAcc: number, nbPersonnes: number, br: boolean, lunch: boolean, dinner: boolean): Observable<string> {
        const url = `${this.baseURL}GetPrice/${idAcc}`;
        let params = new HttpParams()
            .set('nbPersonnes', nbPersonnes.toString())
            .set('br', br.toString())
            .set('lunch', lunch.toString())
            .set('dinner', dinner.toString());
        return this.http.get<string>(url, { params });
    }
    registerAcc(idDancer: number, idAcc: number, nbPersonnes: number): Observable<string> {
      const url = `${this.baseURL}register/${idDancer}/${idAcc}`;
      let params = new HttpParams().set('nbPersonnes', nbPersonnes.toString());
      console.log(params);
      return this.http.post(url, null, { params, responseType: 'text' });
    }
    
    
      

  }
  
  