// This import allows us to inject it into a constructor in a component
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable()
export class ImageUploadService {

  // Default image to display
  imageURL: string = "assets/imgs/default_pet_img.png";

  subject = new BehaviorSubject(this.imageURL);

  getImgURL(): any {
    return this.subject.asObservable();
  }

  updateImgURL(imageURL: string) {
    this.subject.next(imageURL);
  }
}
