import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

@Injectable({
    providedIn: 'root'
  })
  export class WebSocketService {
    private socket$!: WebSocketSubject<any>; // Definite assignment assertion

    private notificationSubject: Subject<any> = new Subject<any>();

    constructor() {}

    public getNotificationSubject(): Subject<any> {
      return this.notificationSubject;
    }

    public connectWebSocket(url: string): void {
      this.socket$ = webSocket(url);

      this.socket$.subscribe(
        (notification) => {
          this.notificationSubject.next(notification);
        },
        (error) => {
          console.error('WebSocket error:', error);
        }
      );
    }
  }
