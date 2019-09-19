import { Component, OnInit } from '@angular/core';
import {SpotifyService} from 'src/app/services/spotifyserv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  newReleases: any[] = [];
  loading= true;


  constructor(private router:Router, private spotify: SpotifyService ) {}

    ngOnInit() {
    
      this.login(); 

      this.spotify.getNewReleases().subscribe((data:any)=>{
      this.newReleases = data;
      this.loading = false;
    });
    }
    
    login(){
      const currentUrl = this.router.url.split('access_token=')[1];
      const token: string = currentUrl ? currentUrl.split('&')[0] : null;
      if (token) {
        localStorage.setItem('auth', token);
        setInterval(() =>{
          this.spotify.refreshToken();
        },30000000);
        } else {
        this.spotify.auth();
      }
    }
  
   

}
  



  


