import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class DataService{

  private source = new BehaviorSubject('');
  current = this.source.asObservable();
  constructor() { }

  change(message: string) {
      this.source.next(message);
  }
}
