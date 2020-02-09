import { Component, OnInit, Input } from "@angular/core";
import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";

@Component({
  selector: "app-grafica-dona",
  templateUrl: "./grafica-dona.component.html",
  styles: []
})
export class GraficaDonaComponent implements OnInit {
  @Input("chartLabels") doughnutChartLabels: Label[];
  @Input("chartData") doughnutChartData: MultiDataSet;
  @Input("chartType") doughnutChartType: ChartType;

  constructor() {}

  ngOnInit() {}

  // Events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
