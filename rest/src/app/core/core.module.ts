import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './components/password/password.component';
import { ToAsteriskPipe } from './pipes/to-asterisk.pipe';



@NgModule({
  declarations: [
    PasswordComponent,
    ToAsteriskPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PasswordComponent,
    ToAsteriskPipe
  ]
})
export class CoreModule { }
