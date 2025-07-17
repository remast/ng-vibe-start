import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-50">
      <router-outlet />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Smoothie Frühstück';
}
