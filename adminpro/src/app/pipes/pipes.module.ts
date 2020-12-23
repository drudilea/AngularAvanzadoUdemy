import { NgModule } from "@angular/core";

import { AuthImagePipe } from "./auth-image.pipe";
import { ImageBuilderPipe } from "./image-builder.pipe";

@NgModule({
  declarations: [AuthImagePipe, ImageBuilderPipe],
  exports: [AuthImagePipe, ImageBuilderPipe],
})
export class PipesModule {}
