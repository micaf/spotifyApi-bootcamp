import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SpotifyService} from './services/spotifyserv.service';
import { SearchComponent } from './components/search/search.component';
import { ArtistasComponent } from './components/artistas/artistas.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { NoimagePipe } from './pipes/noimage.pipe';
import { TracklistComponent } from './components/tracklist/tracklist.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArtistasComponent,
    HomeComponent,
    NavbarComponent,
    LoadingComponent,
    TarjetasComponent,
    DomseguroPipe,
    NoimagePipe,
    TracklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
  
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
