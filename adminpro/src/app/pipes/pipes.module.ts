import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthImagePipe } from "./auth-image.pipe";

@NgModule({
  declarations: [AuthImagePipe],
  imports: [CommonModule],
  exports: [AuthImagePipe],
})
export class PipesModule {}
