import { Component, OnInit, ViewChild} from '@angular/core';
import {SpotifyService} from 'src/app/services/spotifyserv.service';
import { ActivatedRoute } from '@angular/router';
import {PrivateService} from '../../services/private.service';


@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})

export class ArtistasComponent {
  artista: any = {};
  topTracks: any = [];
  loadingArtist: boolean;
  list: any[] = [];
  

  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService,
              private tracklist:PrivateService ) {

    this.loadingArtist = true;

    this.router.params.subscribe( params => {

      this.getArtista( params['id'] );
      this.getTopTracks( params['id'] );
     
    });

  }
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
            this.topTracks = data
          });

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
}}

