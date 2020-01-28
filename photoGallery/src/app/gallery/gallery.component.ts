import { Component, OnChanges } from '@angular/core';
import { ImageService } from '../image-service.service';
import {NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../dataservice.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnChanges {
  //images:any[];
  filterBy?: string = ''
  visibleImages:any[] = [];
  selectedFile : any;
  delete_flag: boolean;
  url_: any;
  base64Image : any;

  constructor(private imageService: ImageService, private data: DataService, public _DomSanitizer: DomSanitizer) {
    this.getImages('images');
  }

  public async getImages(url: string){
    const request = await this.imageService.GET<any>(url);
    request.subscribe(
    (result) => {
        if (result.error === false) {
            this.visibleImages = result.data;
        } else {
            console.log('Error');
        }
    });

    return this.visibleImages;
  }

  delete(){
    this.delete_flag = !this.delete_flag;
  }

  delete_image(id : any){
      this.deleteImages(id);
  }

  public async deleteImages(id: any){
    const request = await this.imageService.DELETE<any>('images/delete/'+id);
    request.subscribe(
    (result) => {
      this.getImages('images');
    },(err) => {
      console.log("Error deleting image.");
      console.log(err);
    });

    return this.visibleImages;
  }

  formatImage (url : string, name: string)
  {
    return this.imageService.baseUrl + name;
  }

  async uploadData() {
      
    if(this.selectedFile) {
      
      const upload = new FormData();
      upload.append('file', this.selectedFile,this.selectedFile.name);

      const request = await this.imageService.POSTFORMDATA<any>('images/upload',upload);
      request.subscribe(
      (result) => {
           let img = result.image;
           img.url = img.url.replace(/\\/g, "\\\\");
           this.uploadDB(img);           
           
      },
      (err) => {
            console.log("Error saving file.");
            console.log(err);
      });

    }

  }

  async uploadDB(image: any) {
      let img = JSON.stringify(image);

      const request = await this.imageService.POST_PARAMS<any>('images/add',img);
      request.subscribe(
      (result) => {
          this.getImages('images');         
      },
      (err) => {
            console.log("Error saving img in BD.");
            console.log(err);
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.data.current.subscribe(message => this.filterBy = message);
    this.getImages('images');
    
  }

  onChange(event: any) {
       
       this.selectedFile = event.target.files[0]; 
       // Clear the input
       //event.srcElement.value = null;  

  }

  ngOnChanges() {
    this.getImages('images');
  }
}
