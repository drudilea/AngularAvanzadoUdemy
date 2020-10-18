import { Component, OnInit, Input } from "@angular/core";
import { ChartType } from "chart.js";
import { MultiDataSet, Label, Color } from "ng2-charts";

@Component({
  selector: "app-grafica-dona",
  templateUrl: "./grafica-dona.component.html",
  styles: [],
})
export class GraficaDonaComponent {
  @Input("chartLabels") doughnutChartLabels: Label[];
  @Input("chartData") doughnutChartData: MultiDataSet;
  @Input("chartType") doughnutChartType: ChartType;
  @Input("chartColors") doughnutChartColors: Color[] = [
    { backgroundColor: ["#9E120E", "#FF5800", "#FFB414"] },
  ];

  constructor() {}

  // Events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
