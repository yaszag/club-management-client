import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions!: any;
  @Input() data: any = [];

  Highcharts = Highcharts;

  constructor() {}

  ngOnInit() {
  
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Monthly subscriptions',
      },
      subtitle: {
        text: 'show subscriptions for each month',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        tickInterval:1,
        title: {
          text: 'Subscriptions',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Monthly',
          data: Array(12).fill(0),
        },
        {
          name: 'Quarterly',
          data: Array(12).fill(0),
        },
        {
          name: 'Semi-Annual',
          data: Array(12).fill(0),
        },
        {
          name: 'Yearly',
          data: Array(12).fill(0),
        },
      ],
    };

    HC_exporting(Highcharts);
    this.populateChart();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  private populateChart(): void {
    console.log(this.data);
    
    this.data.forEach((member: any) => {
      const { startDate, endDate, subscriptionDetails } = member.subscription;
      const designation = subscriptionDetails.designation;
      const startMonth = new Date(startDate).getMonth();

      switch (designation) {
        case 'Monthly':
          this.chartOptions.series[0].data[startMonth]++;

          break;
        case 'Quarterly':
          this.chartOptions.series[1].data[startMonth]++;

          break;
        case 'Semi-Annual':
          this.chartOptions.series[2].data[startMonth]++;

          break;
        case 'Yearly':
          this.chartOptions.series[3].data[startMonth]++;

          break;
      }
    });
  }
}
