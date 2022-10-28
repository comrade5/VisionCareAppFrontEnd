import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartOptions = {
    theme: "dark2",
    animationEnabled: true,
    title:{
      text: "Your activity"
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: [
        { y: 35, name: "Heavy activity" },
        { y: 35, name: "Light activity" },
        { y: 30, name: "Mixed activity" }
      ]
    }]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
