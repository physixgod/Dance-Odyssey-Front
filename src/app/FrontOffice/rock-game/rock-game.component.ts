import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { VideoStreamService } from 'src/app/services/video.service';
import { HttpClient } from '@angular/common/http';
import { CompetitionService } from 'src/app/services/competition.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-rock-game',
  templateUrl: './rock-game.component.html',
  styleUrls: ['./rock-game.component.css']
})
export class RockGameComponent {
  private trigger: Subject<any> = new Subject();
  webcamImage: any;
  sysImage = '';
  videoSrc="";
  userID:any;
  gamePlayed:any;
  

  constructor(private videoStreamService: VideoStreamService,private http: HttpClient,private competitionService: CompetitionService,private router: Router) {}

  ngOnInit() {
    this.userID = sessionStorage.getItem('userID');
    console.log(this.userID);
    this.videoSrc = 'http://127.0.0.1:5000/video_feed';
    
    this.competitionService.getGame(this.userID).subscribe(gamePlayed => {
      this.gamePlayed = gamePlayed;
      console.log('Game played status before played:', this.gamePlayed);
    });
  }



  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public startHandDetection(): void {
    console.log('Hand detection started');
    // Start sending video stream to Flask
    this.sendVideoStreamToFlask();
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
    // Send webcam image to Flask
    this.videoStreamService.sendWebcamImage(webcamImage);
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  private sendVideoStreamToFlask(): void {
    // No need to implement here, as sending is handled in captureImg()
  }
  public getScores(): void {
    this.http.get<any>('http://127.0.0.1:5000/score').subscribe(data => {
      console.log(data);
      const { my_score, pc_score } = data;
    const myScoreInt: number = parseInt(my_score);
    const pcScoreInt: number = parseInt(pc_score);
    console.log('My Score:', myScoreInt);
    console.log('PC Score:', pcScoreInt);
    this.competitionService.gainPoints(myScoreInt, pcScoreInt, this.userID).subscribe(updatedScore => {
      console.log('Updated Score:', updatedScore);
      this.router.navigate(['/results', updatedScore]);
    });
    this.competitionService.getGame(this.userID).subscribe(gamePlayed => {
      this.gamePlayed = gamePlayed;
      console.log('Game played status after played:', this.gamePlayed);
    });
    });
  }
}
