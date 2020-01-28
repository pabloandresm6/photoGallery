import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from '../app/gallery/gallery.component';
import { DetailsComponent } from './details/details.component';
import { AlbumComponent } from './album/album.component';


const routes: Routes = [
  { path: "gallery", component: GalleryComponent },
  { path: "image/:id", component: DetailsComponent },
  { path: "albums", component: AlbumComponent },
  { path: "", redirectTo: "/gallery", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
