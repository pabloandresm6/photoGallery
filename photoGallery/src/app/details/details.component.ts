import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  image: any = {url: '', name: ''};

  constructor(private imageService: ImageService, private route: ActivatedRoute) { 
    this.getImage('images/' + this.route.snapshot.params['id']);
  }

  public async getImage(url: string){
    const request = await this.imageService.GET<any>(url);
    request.subscribe(
    (result) => {
        if (result.error === false) {
            this.image = result.data;
        } else {
            console.log('Error');
        }
    });

    return this.image;
  }

  formatImage (name: string)
  {
    return this.imageService.baseUrl + name;
  }

  bytesToSize(bytes: number) {
    var sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb'];
    for (var i = 0; i < sizes.length; i++) {
      if (bytes <= 1024) {
        return bytes + ' ' + sizes[i];
      } else {
        var d = bytes/1024;
      }
    }
    return d;
  }

  ngOnInit() {

    this.getImage('images/' + this.route.snapshot.params['id']);

  }

}
