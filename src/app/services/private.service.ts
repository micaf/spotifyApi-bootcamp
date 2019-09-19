import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrivateService {
  private trackSource = new BehaviorSubject<any[]>([]);
  tracksSelect = this.trackSource.asObservable();

  constructor() { }

     addTracks(tracks:any[]){
        this.trackSource.next(tracks)
     }

     savePlayListStorage(tracks:any[]){
       this.trackSource
     }
}
