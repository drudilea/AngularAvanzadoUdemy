import { Component, OnInit } from '@angular/core';
import { RequsersService } from '../../services/requsers.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor( private requsersService: RequsersService ) {
   // this.getUsers();
   }

  ngOnInit() {
  }

  getUsers() {
    this.requsersService.getUsers()
    .subscribe((res: any) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

}
