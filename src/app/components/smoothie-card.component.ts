import { Component, input } from '@angular/core';
import { Smoothie } from '../services/smoothie.service';

@Component({
  selector: 'app-smoothie-card',
  templateUrl: './smoothie-card.component.html',
  styleUrl: './smoothie-card.component.css'
})
export class SmoothieCardComponent {
  smoothie = input.required<Smoothie>();
} 