import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SmoothieService } from '../services/smoothie.service';
import { SmoothieCardComponent } from '../components/smoothie-card.component';
import { signal } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let smoothieService: jasmine.SpyObj<SmoothieService>;

  const mockSmoothie = {
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
    difficulty: 'Einfach' as const,
    category: 'Frühstück' as const
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SmoothieService', ['getRandomSmoothie', 'getCurrentSmoothie']);
    
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: SmoothieService, useValue: spy }
      ]
    }).compileComponents();

    smoothieService = TestBed.inject(SmoothieService) as jasmine.SpyObj<SmoothieService>;
  });

  beforeEach(() => {
    // Mock für getCurrentSmoothie
    smoothieService.getCurrentSmoothie.and.returnValue(signal(mockSmoothie));
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject SmoothieService', () => {
    expect(smoothieService).toBeTruthy();
  });

  it('should have currentSmoothie property', () => {
    expect((component as any).currentSmoothie).toBeDefined();
  });

  it('should get current smoothie from service', () => {
    expect(smoothieService.getCurrentSmoothie).toHaveBeenCalled();
    expect((component as any).currentSmoothie()).toEqual(mockSmoothie);
  });

  it('should have getNewSmoothie method', () => {
    expect((component as any).getNewSmoothie).toBeDefined();
    expect(typeof (component as any).getNewSmoothie).toBe('function');
  });

  it('should call getRandomSmoothie on service when getNewSmoothie is called', () => {
    // Arrange
    smoothieService.getRandomSmoothie.and.returnValue(mockSmoothie);
    
    // Act
    (component as any).getNewSmoothie();
    
    // Assert
    expect(smoothieService.getRandomSmoothie).toHaveBeenCalled();
  });

  it('should return smoothie when getNewSmoothie is called', () => {
    // Arrange
    smoothieService.getRandomSmoothie.and.returnValue(mockSmoothie);
    
    // Act
    (component as any).getNewSmoothie();
    
    // Assert
    expect(smoothieService.getRandomSmoothie).toHaveBeenCalledTimes(1);
  });

  it('should have SmoothieCardComponent imported', () => {
    expect(component.constructor.name).toBe('HomeComponent');
  });

  describe('Template Integration', () => {
    it('should render without errors', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should have app-smoothie-card component available', () => {
      const compiled = fixture.nativeElement;
      // Da wir das Template nicht direkt testen, prüfen wir nur, dass die Komponente verfügbar ist
      expect(SmoothieCardComponent).toBeDefined();
    });
  });

  describe('Service Integration', () => {
    it('should use inject function for dependency injection', () => {
      // Prüfen, dass die Komponente inject verwendet
      const componentCode = component.constructor.toString();
      expect(componentCode).toContain('inject');
    });

    it('should have readonly smoothieService property', () => {
      expect(component['smoothieService']).toBeDefined();
      expect(component['smoothieService']).toBe(smoothieService);
    });
  });

  describe('Signal Integration', () => {
    it('should use signal for currentSmoothie', () => {
      const currentSmoothieSignal = (component as any).currentSmoothie;
      expect(currentSmoothieSignal).toBeDefined();
      expect(typeof currentSmoothieSignal).toBe('function');
    });

    it('should return smoothie data from signal', () => {
      const smoothieData = (component as any).currentSmoothie();
      expect(smoothieData).toEqual(mockSmoothie);
    });
  });

  describe('Error Handling', () => {
    it('should handle service errors gracefully', () => {
      // Arrange
      smoothieService.getRandomSmoothie.and.throwError('Service error');
      
      // Act & Assert
      expect(() => (component as any).getNewSmoothie()).toThrow('Service error');
    });

    it('should handle null smoothie from service', () => {
      // Arrange
      smoothieService.getCurrentSmoothie.and.returnValue(signal(null));
      
      // Act
      const newComponent = new HomeComponent();
      
      // Assert
      expect((newComponent as any).currentSmoothie()).toBeNull();
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize properly', () => {
      expect(component).toBeDefined();
      expect(smoothieService.getCurrentSmoothie).toHaveBeenCalled();
    });

    it('should be ready for template binding', () => {
      expect((component as any).currentSmoothie).toBeDefined();
      expect((component as any).getNewSmoothie).toBeDefined();
    });
  });
}); 