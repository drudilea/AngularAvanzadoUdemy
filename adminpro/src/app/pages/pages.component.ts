import { Component, OnInit } from "@angular/core";
import { SidebarService } from "../services/service.index";

declare function init_plugins();

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    init_plugins();
    this.sidebarService.cargarMenu();
  }
}
