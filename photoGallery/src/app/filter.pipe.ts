import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'filter'})
export class ImageFilterPipe implements PipeTransform {
  transform(items: any[], criteria: string): any {
    if(criteria === ''){ 
      return items;
    } 
    else {
      return items.filter(item =>{
        return item.name.toLowerCase() === criteria.toLowerCase() || item.date === criteria || item.name.toLowerCase().startsWith(criteria.toLowerCase()) || item.date.startsWith(criteria);
      });
    }
  }
}
