import { Component, OnInit } from "@angular/core";

declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    init_plugins();
  }
}
