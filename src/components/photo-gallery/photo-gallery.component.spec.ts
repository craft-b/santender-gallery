import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { PhotoService } from '../../app/services/photo.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';


describe('PhotoService', () => {
  let service: PhotoService;
  let httpTesting: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PhotoService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify(); // Ensure that there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch photos', async () => {
    const DEFAULT_PHOTOS = [ {
      albumId: 1,
      id: 1,
      title: 'Photo 1',
      url: 'http://example.com/photo1.jpg',
      thumbnailUrl: 'http://example.com/photo1-thumbnail.jpg'
    }]; // Populate with default photo data

    // Load `PhotoService` and request photos.
    const photos$ = service.getPhotos();

    // `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request,
    // and creates a `Promise` of the response.
    const photosPromise = firstValueFrom(photos$);

    // At this point, the request is pending, and we can assert it was made
    // via the `HttpTestingController`:
    const req = httpTesting.expectOne('https://jsonplaceholder.typicode.com/photos', 'Request to fetch photos');

    // We can assert various properties of the request if desired.
    expect(req.request.method).toBe('GET');

    // Flushing the request causes it to complete, delivering the result.
    req.flush(DEFAULT_PHOTOS);

    // We can then assert that the response was successfully delivered by the `PhotoService`:
   expect(await photosPromise).toEqual(DEFAULT_PHOTOS);
  });
});