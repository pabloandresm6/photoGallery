import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageFilterPipe } from '../app/filter.pipe';
import { ImageService } from '../app/image-service.service';
import { HttpClientModule  } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { AlbumComponent } from './album/album.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    ImageFilterPipe,
    DetailsComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
