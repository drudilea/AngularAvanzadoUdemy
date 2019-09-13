import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './components/password/password.component';
import { ToAsteriskPipe } from './pipes/to-asterisk.pipe';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PasswordComponent,
    ToAsteriskPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    PasswordComponent,
    ToAsteriskPipe
  ]
})
export class CoreModule { }
