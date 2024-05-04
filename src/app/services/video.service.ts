import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WebcamImage } from 'ngx-webcam';

@Injectable({
  providedIn: 'root'
})
export class VideoStreamService {
  private readonly wsSubject$: WebSocketSubject<any>;
  
  constructor() {
    // Establish WebSocket connection with Flask backend
    this.wsSubject$ = new WebSocketSubject('ws://localhost:5000/video-stream');
  }

  // Method to send webcam images to Flask
  public sendWebcamImage(image: WebcamImage): void {
    const imageBlob = this.dataURLtoBlob(image.imageAsDataUrl);
    this.wsSubject$.next(imageBlob);
  }

  // Convert base64 data URL to Blob
  private dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const matchResult = arr[0].match(/:(.*?);/);
    if (matchResult && matchResult[1]) {
      const mime = matchResult[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    } else {
      throw new Error('Invalid data URL');
    }
  }
}
