import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PhotoGalleryComponent } from "../components/photo-gallery/photo-gallery.component";
import { AppComponent } from "./app.component";
import { provideHttpClient } from "@angular/common/http";


@NgModule({
    declarations: [
        AppComponent,
        PhotoGalleryComponent
    ],
    imports: [
        BrowserModule,
        
        
    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})

export class AppModule {}
