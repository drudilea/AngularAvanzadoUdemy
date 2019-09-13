import { Component, OnInit } from '@angular/core';
import { ReqresService } from 'src/app/services/reqres.service';
import { RequsersService } from 'src/app/core/services/requsers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private reqresService: ReqresService,
    private requsersService: RequsersService
    ) {
    this.getUsers();
   }

  ngOnInit() {
  }

  getUsers() {
    this.reqresService.getUsers()
      .subscribe((res: any) => {
        console.log(res);
      }, (err: any) => {
        console.log(err);
      });

    this.requsersService.getUsers()
    .subscribe((resu: any) => {
      console.log(resu);
    }, (err: any) => {
      console.log(err);
    });
  }
}
