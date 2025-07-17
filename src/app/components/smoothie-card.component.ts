import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Smoothie, ApiSmoothie } from '../services/smoothie.service';

@Component({
  selector: 'app-smoothie-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './smoothie-card.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SmoothieCardComponent {
  smoothie = input<Smoothie | null>(null);
  apiSmoothie = input<ApiSmoothie | null>(null);
} 