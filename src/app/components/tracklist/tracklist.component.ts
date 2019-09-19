import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotifyserv.service';
import {PrivateService} from '../../services/private.service';


@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.css']
})

export class TracklistComponent implements OnInit {
  list: any[] = [];
  constructor(private spotify:SpotifyService,
              private tracklist:PrivateService) { }


  
ngOnInit() {
        this.tracklist.tracksSelect.subscribe(data => 
          {this.list = data;
        localStorage.setItem("tracklist", JSON.stringify(this.list))})
            }
  
deleteTracks(track){
  const index = this.list.indexOf(track);
  if (index > -1) {
    this.list.splice(index, 1);
}}

}


