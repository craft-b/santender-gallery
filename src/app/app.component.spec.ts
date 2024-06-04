
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppComponent } from './app.component';
import { PhotoGalleryComponent } from '../components/photo-gallery/photo-gallery.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      declarations: [AppComponent, PhotoGalleryComponent],
      imports: [CommonModule], // Include CommonModule or any other required modules here
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'santender-gallery' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('santender-gallery');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection to render the component
  
    const compiled = fixture.nativeElement as HTMLElement;
    // Find the title element within the PhotoGalleryComponent's view
    const titleElement = compiled.querySelector('.photo-gallery .gallery-title') as HTMLElement;
    expect(titleElement.textContent).toContain('Photo Gallery');
  });
  
});