import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Photo } from '../models/photo.model';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private httpClient: HttpClient) { }

  // Http call to retrieve photos from api
  getPhotos(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.apiUrl).pipe(
      map(photos => photos.slice(0, 100)) // Limit to the first 100 photos for demonstration
    );
  }
}
