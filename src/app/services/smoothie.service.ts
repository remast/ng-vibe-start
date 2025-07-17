import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

// Neue Interfaces basierend auf der tatsächlichen API-Struktur
export interface ApiSmoothie {
  id: number;
  name: string;
  kategorie: string;
  zutaten: string[];
  zubereitung: string;
  portionen: number;
  kalorien: number;
  zubereitungszeit: string;
  naehrwerte: Naehrwerte;
}

export interface Naehrwerte {
  ballaststoffe: string;
  fett: string;
  kohlenhydrate: string;
  protein: string;
}

// Bestehende Interface für lokale Smoothies
export interface Smoothie {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  prepTime: number;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  category: 'Frühstück' | 'Energie' | 'Erfrischung' | 'Gesundheit';
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SmoothieService {
  private readonly apiUrl = 'https://smoothie-api-959185784025.europe-west1.run.app/api/smoothies/random';
  
  private readonly smoothies = signal<Smoothie[]>([
    {
      id: 1,
      name: 'Grüner Power Smoothie',
      ingredients: ['2 Handvoll Spinat', '1 Banane', '1 Apfel', '1/2 Gurke', '1 Zitrone (Saft)', '200ml Kokoswasser'],
      instructions: 'Alle Zutaten in den Mixer geben und cremig pürieren. Bei Bedarf mit Eiswürfeln servieren.',
      prepTime: 5,
      difficulty: 'Einfach',
      category: 'Gesundheit'
    },
    {
      id: 2,
      name: 'Beeren-Frühstücks-Smoothie',
      ingredients: ['1/2 Tasse Erdbeeren', '1/2 Tasse Blaubeeren', '1 Banane', '1/2 Tasse Haferflocken', '200ml Mandelmilch', '1 EL Honig'],
      instructions: 'Haferflocken kurz in Mandelmilch einweichen. Alle Zutaten mixen bis cremig.',
      prepTime: 8,
      difficulty: 'Einfach',
      category: 'Frühstück'
    },
    {
      id: 3,
      name: 'Tropischer Energieschub',
      ingredients: ['1 Mango', '1/2 Ananas', '1 Banane', '1/2 Tasse Kokosmilch', '1 EL Chiasamen', '1/2 Tasse Eiswürfel'],
      instructions: 'Obst schneiden und mit Kokosmilch mixen. Chiasamen unterrühren und mit Eis servieren.',
      prepTime: 7,
      difficulty: 'Mittel',
      category: 'Energie'
    },
    {
      id: 4,
      name: 'Protein-Power Smoothie',
      ingredients: ['1 Banane', '1/2 Tasse Beeren', '1 EL Proteinpulver', '200ml Sojamilch', '1 EL Mandelmus', '1/2 Tasse Eiswürfel'],
      instructions: 'Alle Zutaten in den Mixer geben und kräftig mixen bis schaumig.',
      prepTime: 6,
      difficulty: 'Einfach',
      category: 'Energie'
    },
    {
      id: 5,
      name: 'Erfrischender Minz-Smoothie',
      ingredients: ['1 Gurke', '1 Handvoll Minze', '1 Limette (Saft)', '1/2 Apfel', '200ml Kokoswasser', '1 EL Honig'],
      instructions: 'Gurke und Apfel schneiden, mit Minze und Limettensaft mixen. Mit Kokoswasser verdünnen.',
      prepTime: 5,
      difficulty: 'Einfach',
      category: 'Erfrischung'
    },
    {
      id: 6,
      name: 'Schokoladen-Bananen-Smoothie',
      ingredients: ['2 Bananen', '2 EL Kakaopulver', '200ml Mandelmilch', '1 EL Ahornsirup', '1/2 Tasse Eiswürfel', '1 Prise Salz'],
      instructions: 'Bananen einfrieren lassen, dann mit allen Zutaten cremig mixen.',
      prepTime: 10,
      difficulty: 'Mittel',
      category: 'Frühstück'
    },
    {
      id: 7,
      name: 'Anti-Oxidantien-Boost',
      ingredients: ['1/2 Tasse Acai-Pulver', '1/2 Tasse Blaubeeren', '1 Banane', '1 Handvoll Spinat', '200ml Mandelmilch', '1 EL Chiasamen'],
      instructions: 'Acai-Pulver mit Mandelmilch verrühren, dann alle Zutaten mixen.',
      prepTime: 8,
      difficulty: 'Mittel',
      category: 'Gesundheit'
    },
    {
      id: 8,
      name: 'Zitrus-Energie-Smoothie',
      ingredients: ['1 Orange', '1/2 Grapefruit', '1 Karotte', '1 Stück Ingwer', '200ml Kokoswasser', '1 EL Honig'],
      instructions: 'Zitrusfrüchte schälen, Karotte raspeln. Alles mit Ingwer und Kokoswasser mixen.',
      prepTime: 7,
      difficulty: 'Einfach',
      category: 'Energie'
    },
    {
      id: 9,
      name: 'Avocado-Cremesmoothie',
      ingredients: ['1/2 Avocado', '1 Banane', '1 Handvoll Spinat', '200ml Mandelmilch', '1 EL Honig', '1/2 Tasse Eiswürfel'],
      instructions: 'Avocado und Banane cremig mixen, dann Spinat und Mandelmilch hinzufügen.',
      prepTime: 6,
      difficulty: 'Einfach',
      category: 'Frühstück'
    },
    {
      id: 10,
      name: 'Kurkuma-Golden-Milk-Smoothie',
      ingredients: ['1 Banane', '1/2 Tasse Mango', '1 TL Kurkumapulver', '1/2 TL Zimt', '200ml Mandelmilch', '1 Prise schwarzer Pfeffer'],
      instructions: 'Alle Zutaten mixen. Kurkuma mit Pfeffer für bessere Aufnahme kombinieren.',
      prepTime: 8,
      difficulty: 'Mittel',
      category: 'Gesundheit'
    }
  ]);

  private currentSmoothie = signal<Smoothie | null>(null);
  private currentApiSmoothie = signal<ApiSmoothie | null>(null);
  private isLoading = signal<boolean>(false);
  private error = signal<string | null>(null);

  readonly randomSmoothie = computed(() => this.currentSmoothie());
  readonly randomApiSmoothie = computed(() => this.currentApiSmoothie());
  readonly loading = computed(() => this.isLoading());
  readonly errorMessage = computed(() => this.error());

  constructor(private http: HttpClient) {}

  // Neue Methode für API-Aufruf
  fetchRandomSmoothie(): Observable<ApiSmoothie> {
    this.isLoading.set(true);
    this.error.set(null);
    
    return this.http.get<ApiSmoothie>(this.apiUrl).pipe(
      map(smoothie => {
        this.currentApiSmoothie.set(smoothie);
        this.isLoading.set(false);
        return smoothie;
      }),
      catchError(err => {
        console.error('Fehler beim Laden des Smoothies:', err);
        this.error.set('Fehler beim Laden des Smoothies. Bitte versuche es erneut.');
        this.isLoading.set(false);
        return of(null as any);
      })
    );
  }

  // Methode um API-Smoothie in lokales Format zu konvertieren
  convertApiSmoothieToLocal(apiSmoothie: ApiSmoothie): Smoothie {
    // Extrahiere die Zubereitungszeit als Zahl
    const prepTimeMatch = apiSmoothie.zubereitungszeit.match(/(\d+)/);
    const prepTime = prepTimeMatch ? parseInt(prepTimeMatch[1]) : 5;

    // Mappe Kategorien
    const categoryMap: { [key: string]: 'Frühstück' | 'Energie' | 'Erfrischung' | 'Gesundheit' } = {
      'Grün': 'Gesundheit',
      'Früchte': 'Energie',
      'Protein': 'Energie',
      'Beeren': 'Frühstück',
      'Tropisch': 'Erfrischung',
      'Gemüse': 'Gesundheit'
    };

    return {
      id: apiSmoothie.id,
      name: apiSmoothie.name,
      ingredients: apiSmoothie.zutaten,
      instructions: apiSmoothie.zubereitung,
      prepTime: prepTime,
      difficulty: this.getDifficultyByPrepTime(prepTime),
      category: categoryMap[apiSmoothie.kategorie] || 'Gesundheit',
      imageUrl: undefined // API liefert keine Bilder
    };
  }

  private getDifficultyByPrepTime(prepTime: number): 'Einfach' | 'Mittel' | 'Schwer' {
    if (prepTime <= 5) return 'Einfach';
    if (prepTime <= 10) return 'Mittel';
    return 'Schwer';
  }

  // Bestehende Methoden
  getRandomSmoothie(): void {
    const smoothies = this.smoothies();
    const randomIndex = Math.floor(Math.random() * smoothies.length);
    this.currentSmoothie.set(smoothies[randomIndex]);
  }

  getAllSmoothies(): Smoothie[] {
    return this.smoothies();
  }
} 