import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SettingsService,
  SidebarService,
  UsuarioService,
} from "./service.index";
import { UploadFilesService } from "./files/upload-files.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    SettingsService,
    SidebarService,
    UsuarioService,
    UploadFilesService,
  ],
})
export class ServiceModule {}
