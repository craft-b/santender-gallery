import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../app/services/photo.service';
import { Photo } from '../../app/models/photo.model';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'] // Change styleUrl to styleUrls
})
export class PhotoGalleryComponent implements OnInit {
  photos: Photo[] = [];
  photosPages: Photo[][] = [];
  pageSize = 25;
  totalPages = 4;
  currentPage = 1;
  paginatedPhotos: any;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    // Fetch photos from the service when the component initializes
    this.photoService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
      this.chunkPhotos(); // Call chunkPhotos to paginate the photos
    });
  }

  // Paginate the photos into pages based on the page size
  chunkPhotos() {
    for (let i = 0; i < this.totalPages; i++) {
      this.photosPages.push(this.photos.slice(i * this.pageSize, (i + 1) * this.pageSize));
    }
  }

  // Set the current page to the specified page number
  setPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }
}
