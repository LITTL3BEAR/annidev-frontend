import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);

  toggleDarkTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.value);
  }

  isDarkTheme$() {
    return this.isDarkTheme.asObservable();
  }
}