import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    convertToBase64(file: File): string {
        const reader = new FileReader();

        reader.onload = () => {
            return reader.result as string;
        };
    
        reader.readAsDataURL(file);
        return reader.result as string
        
    }
}
