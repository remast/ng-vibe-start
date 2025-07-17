import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SmoothieService } from '../services/smoothie.service';
import { SmoothieCardComponent } from '../components/smoothie-card.component';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">
            🥤 Smoothie Frühstück
          </h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Entdecke gesunde und leckere Smoothie-Rezepte für dein perfektes Frühstück. 
            Jeder Klick zeigt dir ein neues zufälliges Rezept!
          </p>
        </div>

        <!-- Smoothie Card -->
        <div class="mb-8">
          <app-smoothie-card [smoothie]="smoothieService.randomSmoothie()" />
        </div>

        <!-- Action Buttons -->
        <div class="text-center space-y-4">
          <button 
            (click)="getNewRandomSmoothie()"
            class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
            </svg>
            Neuer Smoothie
          </button>

          <div class="text-sm text-gray-500">
            <p>Klicke auf den Button für ein neues zufälliges Rezept</p>
            <p class="mt-1">Insgesamt {{ smoothieService.getAllSmoothies().length }} verschiedene Smoothies verfügbar</p>
          </div>
        </div>

        <!-- Info Section -->
        <div class="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">
            🍃 Über unsere Smoothies
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Gesund & Lecker</h3>
              <p class="text-gray-600">
                Alle unsere Smoothie-Rezepte sind sorgfältig ausgewählt und kombinieren 
                frische Zutaten für maximale Nährstoffe und Geschmack.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Perfekt für Frühstück</h3>
              <p class="text-gray-600">
                Starte energiereich in den Tag mit unseren ausgewogenen Smoothies. 
                Ideal für ein gesundes und schnelles Frühstück.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  imports: [SmoothieCardComponent]
})
export class HomeComponent implements OnInit {
  protected readonly smoothieService = inject(SmoothieService);

  ngOnInit(): void {
    // Beim ersten Laden einen zufälligen Smoothie generieren
    this.getNewRandomSmoothie();
  }

  getNewRandomSmoothie(): void {
    this.smoothieService.getRandomSmoothie();
  }
} 