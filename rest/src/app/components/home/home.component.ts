import { Component, OnInit } from '@angular/core';
import { ReqresService } from 'src/app/services/reqres.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private reqresService: ReqresService ) {
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
  }
}
