import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  token:string = null;
  constructor(private http: HttpClient) {}

  
  auth() {
    this.token = localStorage.getItem('auth');
    const urlBase = 'https://accounts.spotify.com/authorize';
    const clientId = '7b843b9bcc3341d1b76ccdfe73a61921';
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const redirectUri = encodeURIComponent('http://localhost:4200/home');
    const url = `${urlBase}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`;
    if (!this.token) {
      window.location.href = url;
    }
  }
  refreshToken() {
    const clientId = '7b843b9bcc3341d1b76ccdfe73a61921';
    const clientSecret = 'b35aadc820ce4a29900fb7f008da38a6';
    const url = `https://bootcamp-angular.herokuapp.com/spotify/${clientId}/${clientSecret}`;
    this.http.get(url).subscribe((data: any) => {
      localStorage.setItem('auth', data.access_token);
    });
 }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    this.token = localStorage.getItem('auth');

    const headers= new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.get(url, { headers });
  }

  postQuery (query: string) {
    const url = `https://api.spotify.com/v1/7b843b9bcc3341d1b76ccdfe73a61921/${query}`;
    this.token = localStorage.getItem('auth');

    const headers= new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  
    return this.http.post(url, { headers });
  }
  
  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20").pipe(
      map(data => data["albums"].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data["artists"].items)
    );
  }
  
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    
  }
 
  getAlbum(id: string){
    return this.getQuery(`albums/${id}`);
  }
  getAlbumTracks(id: string){
    return this.getQuery(`albums/${id}/tracks`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data["tracks"])
    );
  }

  getPlayTrack(id: string){
    return this.getQuery(`audio-features/06AKEBrKUckW0KREUWRnvT`);
  }

  createPlayList(){
    return this.postQuery(`playlists`);
  }

  
}




