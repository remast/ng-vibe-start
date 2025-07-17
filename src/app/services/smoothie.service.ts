import { Injectable, signal, computed } from '@angular/core';

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

  readonly randomSmoothie = computed(() => this.currentSmoothie());

  getRandomSmoothie(): void {
    const smoothies = this.smoothies();
    const randomIndex = Math.floor(Math.random() * smoothies.length);
    this.currentSmoothie.set(smoothies[randomIndex]);
  }

  getAllSmoothies(): Smoothie[] {
    return this.smoothies();
  }
} 