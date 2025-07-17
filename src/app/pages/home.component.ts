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
            🥤 Smoothie API
          </h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Entdecke zufällige Smoothie-Rezepte von der API. 
            Jeder Klick lädt ein neues Rezept direkt vom Server!
          </p>
        </div>

        <!-- Loading State -->
        @if (smoothieService.loading()) {
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
            <p class="text-gray-600">Lade Smoothie-Rezept...</p>
          </div>
        }

        <!-- Error State -->
        @if (smoothieService.errorMessage()) {
          <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-center">
            <div class="text-red-600 mb-2">
              <svg class="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="text-red-800 font-medium">{{ smoothieService.errorMessage() }}</p>
            <button 
              (click)="getNewRandomSmoothie()"
              class="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        }

        <!-- Smoothie Card -->
        @if (!smoothieService.loading() && !smoothieService.errorMessage() && smoothieService.randomSmoothie()) {
          <div class="mb-8">
            <app-smoothie-card 
              [smoothie]="smoothieService.randomSmoothie()" 
              [apiSmoothie]="smoothieService.randomApiSmoothie()" 
            />
          </div>
        }

        <!-- Action Buttons -->
        <div class="text-center space-y-4">
          <button 
            (click)="getNewRandomSmoothie()"
            [disabled]="smoothieService.loading()"
            class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
            </svg>
            {{ smoothieService.loading() ? 'Lädt...' : 'Neuer Smoothie' }}
          </button>

          <div class="text-sm text-gray-500">
            <p>Klicke auf den Button für ein neues zufälliges Rezept von der API</p>
            <p class="mt-1">Live-Daten von der Smoothie-API</p>
          </div>
        </div>

        <!-- API Info Section -->
        <div class="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">
            🌐 API-Integration
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Live-Daten</h3>
              <p class="text-gray-600">
                Alle Smoothie-Rezepte werden live von der Smoothie-API geladen. 
                Jeder Klick ruft ein neues zufälliges Rezept vom Server ab.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Echtzeit-Updates</h3>
              <p class="text-gray-600">
                Die App zeigt Loading-States und behandelt Fehler elegant. 
                Bei Verbindungsproblemen kannst du es erneut versuchen.
              </p>
            </div>
          </div>
          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 class="text-sm font-semibold text-gray-700 mb-2">API-Endpoint:</h4>
            <code class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              https://smoothie-api-959185784025.europe-west1.run.app/api/smoothies/random
            </code>
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
    // Beim ersten Laden einen zufälligen Smoothie von der API laden
    this.getNewRandomSmoothie();
  }

  getNewRandomSmoothie(): void {
    this.smoothieService.fetchRandomSmoothie().subscribe(apiSmoothie => {
      if (apiSmoothie) {
        // Konvertiere API-Smoothie in lokales Format
        const localSmoothie = this.smoothieService.convertApiSmoothieToLocal(apiSmoothie);
        // Setze den konvertierten Smoothie als aktuellen Smoothie
        this.smoothieService['currentSmoothie'].set(localSmoothie);
      }
    });
  }
} 