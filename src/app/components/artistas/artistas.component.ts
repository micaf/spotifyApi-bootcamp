import { Component, ViewChild, TemplateRef} from '@angular/core';
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
  checked: boolean;
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

    ngOnInit(){
      this.tracklist.tracksSelect.subscribe(data => this.list = data)
      
    }

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



checkFavourites(track){
  if (this.list.includes(track)==false){

     return false;
  }else{
     return true;
  }
}

saveTracks(track){
  if(this.list.includes(track)==false){
    alert("Esta canción ha sido agregada a los favoritos")
    return this.list.push(track);}
    else{
      return alert("Esta canción ya se encuentra en tus favoritos")
    }}
  
deleteTracks(track){
    const index = this.list.indexOf(track);
    if (index > -1) {
     alert("Esta canción ha sido eliminada de tus favoritos")
     return this.list.splice(index, 1);}
 }

newList() {
  this.tracklist.addTracks(this.list)
}
}

