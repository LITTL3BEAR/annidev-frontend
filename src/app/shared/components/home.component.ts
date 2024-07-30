import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header />
    <p>home works!</p>
  `,
  styles: ``
})
export class HomeComponent {

}
