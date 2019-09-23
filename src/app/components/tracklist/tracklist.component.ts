import { Component, OnInit, ViewChild } from '@angular/core';
import {SpotifyService} from '../../services/spotifyserv.service';
import {PrivateService} from '../../services/private.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.css']
})



export class TracklistComponent implements OnInit {
  list: any[] = [];
  displayedColumns: string[]  = ["favoritos","album.images","album.name","name","duration_ms", "uri"]
  @ViewChild(MatSort, {static:true}) sort: MatSort;
  dataSource: MatTableDataSource<unknown>;

  constructor(private spotify:SpotifyService,
              private tracklist:PrivateService) { }
ngAfterContentChecked(){
  this.dataSource = new MatTableDataSource(this.list);
  this.dataSource.sort = this.sort;
}


deleteTracks(track){
      const index = this.list.indexOf(track);
            if (index > -1) {
              this.list.splice(index, 1);
              }}
  
ngOnInit() {
        this.tracklist.tracksSelect.subscribe(data => this.list = data);
        localStorage.setItem("tracklist", JSON.stringify(this.list))
        
          }
  


}


