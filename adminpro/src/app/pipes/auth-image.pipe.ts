import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "authImage",
})
export class AuthImagePipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  async transform(src: string): Promise<string> {
    if (src && src.includes("https")) {
      return src;
    }

    const token = localStorage.getItem("token");

    try {
      const imageBlob = await this.http
        .get(src, { headers: { "x-token": token }, responseType: "blob" })
        .toPromise();
      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageBlob);
      });
    } catch {
      return "assets/images/no-image.jpg";
    }
  }
}
