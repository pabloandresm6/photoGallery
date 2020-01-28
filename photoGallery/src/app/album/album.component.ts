import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image-service.service';
import { DataService } from '../dataservice.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  filterBy?: string = ''
  visibleAlbums:any[] = [];
  visibleImageAlbums:any[] = [];
  delete_flag: boolean;
  url_: any;
  name: any;
  base64Image : any;
  nameAlbum: any;

  constructor(private imageService: ImageService, private data: DataService, public _DomSanitizer: DomSanitizer) { 
    this.getAlbums('albums');
  }

  public async getAlbums(url: string){
    const request = await this.imageService.GET<any>(url);
    request.subscribe(
    (result) => {
        if (result.error === false) {
            this.visibleAlbums = result.data;
        } else {
            console.log('Error');
        }
    });

    return this.visibleAlbums;
  }

  async create(name: any) {
    var obj = {"name":name};
    let album = JSON.stringify(obj);

    const request = await this.imageService.POST_PARAMS<any>('album/add',album);
    request.subscribe(
    (result) => {
        this.getAlbums('albums');         
    },
    (err) => {
          console.log("Error saving album in BD.");
          console.log(err);
    });
}

  public async getImageAlbums(url: string){
    const request = await this.imageService.GET<any>(url);
    request.subscribe(
    (result) => {
        if (result.error === false) {
            this.visibleImageAlbums = result.data;
        } else {
            console.log('Error');
        }
    });

    return this.visibleImageAlbums;
  }

  createAlbum() {
     if(this.nameAlbum) {
       this.create(this.nameAlbum);
     }
  }

  onChange(event: any) {
       
    this.name = event.target.value;

}

  formatImage (url : string, name: string)
  {
    return this.imageService.baseUrl + name;
  }

  ngOnInit() {
    this.data.current.subscribe(message => this.filterBy = message);
    this.getAlbums('albums');
  }


}
