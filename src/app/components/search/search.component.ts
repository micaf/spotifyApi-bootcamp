import { Component, OnInit } from '@angular/core';
import {SpotifyService} from 'src/app/services/spotifyserv.service';
import {Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  artistas = [];
  loading: boolean;
  constructor(private spotify: SpotifyService) { }
  private searchSub$ = new Subject<string>();

  applyFilter(filterValue: string) {
    this.searchSub$.next(filterValue)
}

ngOnInit() {
  this.searchSub$.pipe(
    debounceTime(400),
    distinctUntilChanged()
  ).subscribe((filterValue: string) => {
    this.spotify.getArtistas(filterValue)
    .subscribe( (data: any) => {
    console.log(data);
    this.artistas = data;
    this.loading=false
    }
)}
  )}}




