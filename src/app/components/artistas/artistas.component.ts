import { Component, ViewChild} from '@angular/core';
import {SpotifyService} from 'src/app/services/spotifyserv.service';
import { ActivatedRoute } from '@angular/router';
import {PrivateService} from '../../services/private.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})

export class ArtistasComponent {
  artista: any = {};
  loadingArtist: boolean;
  list: any[] = [];
  
  
  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService,
              private tracklist:PrivateService ) {

    this.loadingArtist = true;

    this.router.params.subscribe( params => {

      this.getArtista( params['id'] );
      this.getTopTracks( params['id'] );
     
    });}

    displayedColumns: string[]  = ["favoritos","album.images","album.name","name","duration_ms", "uri"]
    @ViewChild(MatSort, {static:true}) sort: MatSort;
    dataSource: MatTableDataSource<unknown>;

  
getArtista( id: string ) {

  this.loadingArtist = true;

  this.spotify.getArtista( id )
        .subscribe( artista => {
          console.log(artista);
          this.artista = artista;

          this.loadingArtist = false;
        });

}

getTopTracks( id: string ) {

  this.spotify.getTopTracks( id )
          .subscribe( data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
          });

}

ngOnInit(){
  this.tracklist.tracksSelect.subscribe(data => this.list = data)
  
}


saveTracks(track){
  if(this.list.includes(track)==false){
    this.list.push(track);
  }else{
    alert("La canción ya se encuentra en tu favoritos!")
  }}
deleteTracks(track){
    const index = this.list.indexOf(track);
    if (index > -1) {
      return this.list.splice(index, 1);
  }else{
    alert("Esta canción no se encuentra en tu favoritos")
  }} 
newList() {
  this.tracklist.addTracks(this.list)
}
}

