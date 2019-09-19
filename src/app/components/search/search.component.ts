import { Component, Output, EventEmitter } from '@angular/core';
import {SpotifyService} from 'src/app/services/spotifyserv.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  artistas = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) { }

  buscar(termino: string) {
    console.log(termino);
    this.loading = true;
    this.spotify.getArtistas(termino)
    .subscribe( (data: any) => {
    console.log(data);
    this.artistas = data;
    this.loading = false;
    
})


}}
