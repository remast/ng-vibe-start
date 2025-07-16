import { Injectable, signal } from '@angular/core';

export interface Smoothie {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  prepTime: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  category: 'Frühstück' | 'Energie' | 'Detox' | 'Protein';
}

@Injectable({
  providedIn: 'root'
})
export class SmoothieService {
  private readonly smoothies: Smoothie[] = [
    {
      id: 1,
      name: 'Grüner Power Smoothie',
      ingredients: [
        '2 Handvoll Spinat',
        '1 Banane',
        '1 Apfel',
        '1/2 Gurke',
        '1/2 Zitrone (Saft)',
        '200ml Wasser'
      ],
      instructions: 'Alle Zutaten in den Mixer geben und 2-3 Minuten mixen bis eine cremige Konsistenz erreicht ist.',
      prepTime: '5 Minuten',
      difficulty: 'Einfach',
      category: 'Frühstück'
    },
    {
      id: 2,
      name: 'Beeren Protein Smoothie',
      ingredients: [
        '1/2 Tasse gemischte Beeren (Erdbeeren, Himbeeren, Blaubeeren)',
        '1 Banane',
        '1/2 Tasse griechischer Joghurt',
        '1 EL Mandelbutter',
        '1 EL Chiasamen',
        '150ml Mandelmilch'
      ],
      instructions: 'Alle Zutaten in den Mixer geben und 1-2 Minuten mixen. Mit Chiasamen garnieren.',
      prepTime: '5 Minuten',
      difficulty: 'Einfach',
      category: 'Protein'
    },
    {
      id: 3,
      name: 'Orange Detox Smoothie',
      ingredients: [
        '2 Orangen (geschält)',
        '1 Karotte',
        '1/2 Ingwer (1cm)',
        '1/2 Zitrone (Saft)',
        '1 Handvoll Spinat',
        '100ml Wasser'
      ],
      instructions: 'Alle Zutaten in den Mixer geben und 2 Minuten mixen. Durch ein Sieb passieren für eine glatte Konsistenz.',
      prepTime: '7 Minuten',
      difficulty: 'Mittel',
      category: 'Detox'
    },
    {
      id: 4,
      name: 'Banana Oat Energy Smoothie',
      ingredients: [
        '1 Banane',
        '1/4 Tasse Haferflocken',
        '1 EL Honig',
        '1/2 TL Zimt',
        '1/2 Tasse griechischer Joghurt',
        '150ml Mandelmilch'
      ],
      instructions: 'Haferflocken 10 Minuten in Mandelmilch einweichen. Alle Zutaten mixen bis cremig.',
      prepTime: '15 Minuten',
      difficulty: 'Einfach',
      category: 'Energie'
    },
    {
      id: 5,
      name: 'Mango Avocado Smoothie',
      ingredients: [
        '1/2 Mango',
        '1/2 Avocado',
        '1 Handvoll Spinat',
        '1/2 Limette (Saft)',
        '1 EL Agavendicksaft',
        '150ml Wasser'
      ],
      instructions: 'Alle Zutaten in den Mixer geben und 2-3 Minuten mixen bis eine cremige Konsistenz erreicht ist.',
      prepTime: '6 Minuten',
      difficulty: 'Mittel',
      category: 'Frühstück'
    },
    {
      id: 6,
      name: 'Apple Cinnamon Smoothie',
      ingredients: [
        '1 Apfel (entkernt)',
        '1/2 Banane',
        '1/2 TL Zimt',
        '1 EL Mandelbutter',
        '1/4 Tasse griechischer Joghurt',
        '150ml Mandelmilch'
      ],
      instructions: 'Apfel in kleine Stücke schneiden. Alle Zutaten mixen und mit Zimt bestäuben.',
      prepTime: '5 Minuten',
      difficulty: 'Einfach',
      category: 'Frühstück'
    },
    {
      id: 7,
      name: 'Green Protein Power',
      ingredients: [
        '1 Handvoll Spinat',
        '1/2 Avocado',
        '1/2 Banane',
        '1 EL Erbsenprotein',
        '1/2 Gurke',
        '1/2 Zitrone (Saft)',
        '200ml Wasser'
      ],
      instructions: 'Alle Zutaten in den Mixer geben und 2-3 Minuten mixen. Proteinpulver zum Schluss hinzufügen.',
      prepTime: '8 Minuten',
      difficulty: 'Mittel',
      category: 'Protein'
    },
    {
      id: 8,
      name: 'Berry Blast Energy',
      ingredients: [
        '1/2 Tasse gemischte Beeren',
        '1/2 Banane',
        '1 EL Chiasamen',
        '1/2 Tasse griechischer Joghurt',
        '1 EL Honig',
        '150ml Mandelmilch'
      ],
      instructions: 'Chiasamen 5 Minuten in Mandelmilch einweichen. Alle Zutaten mixen und sofort servieren.',
      prepTime: '10 Minuten',
      difficulty: 'Einfach',
      category: 'Energie'
    },
    {
      id: 9,
      name: 'Citrus Detox Cleanse',
      ingredients: [
        '1 Grapefruit (geschält)',
        '1 Orange (geschält)',
        '1/2 Zitrone (Saft)',
        '1 Handvoll Spinat',
        '1/2 Ingwer (1cm)',
        '100ml Wasser'
      ],
      instructions: 'Alle Zutaten in den Mixer geben und 2 Minuten mixen. Durch ein feines Sieb passieren.',
      prepTime: '6 Minuten',
      difficulty: 'Mittel',
      category: 'Detox'
    },
    {
      id: 10,
      name: 'Tropical Paradise',
      ingredients: [
        '1/2 Mango',
        '1/2 Ananas',
        '1/2 Banane',
        '1 Handvoll Spinat',
        '1/2 Limette (Saft)',
        '150ml Wasser'
      ],
      instructions: 'Alle Zutaten in den Mixer geben und 2-3 Minuten mixen bis eine cremige Konsistenz erreicht ist.',
      prepTime: '5 Minuten',
      difficulty: 'Einfach',
      category: 'Frühstück'
    }
  ];

  private readonly currentSmoothie = signal<Smoothie | null>(null);

  constructor() {
    this.getRandomSmoothie();
  }

  getRandomSmoothie(): Smoothie {
    const randomIndex = Math.floor(Math.random() * this.smoothies.length);
    const smoothie = this.smoothies[randomIndex];
    this.currentSmoothie.set(smoothie);
    return smoothie;
  }

  getCurrentSmoothie() {
    return this.currentSmoothie;
  }

  getAllSmoothies(): Smoothie[] {
    return this.smoothies;
  }
} 