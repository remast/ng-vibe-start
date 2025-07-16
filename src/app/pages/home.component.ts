import { Component, inject } from '@angular/core';
import { SmoothieService } from '../services/smoothie.service';
import { SmoothieCardComponent } from '../components/smoothie-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [SmoothieCardComponent]
})
export class HomeComponent {
  private readonly smoothieService = inject(SmoothieService);
  
  protected readonly currentSmoothie = this.smoothieService.getCurrentSmoothie();
  
  protected getNewSmoothie(): void {
    this.smoothieService.getRandomSmoothie();
  }
} 