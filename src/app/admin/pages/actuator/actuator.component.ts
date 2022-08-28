import { HttpErrorResponse } from '@angular/common/http';
import { SystemHealth } from './../../interface/system.health';
import { Component, OnInit } from '@angular/core';
import { SystemCpu } from '../../interface/system.cpu';
import { ActuatorService } from './actuator.service';
import { Chart } from 'chart.js';
import { ChartType } from '../../interface/enum/chart-type.enum';
import { NONE_TYPE } from '@angular/compiler';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-actuator',
  templateUrl: './actuator.component.html',
  styleUrls: ['./actuator.component.css'],
})
export class ActuatorComponent implements OnInit {
  public traceList: any[] = [];
  public selectedTrace: any;
  public systemHealth: any;
  public systemCpu: any;
  public processUpTime!: string;
  public http200Traces: any[] = [];
  public http400Traces: any[] = [];
  public http404Traces: any[] = [];
  public http500Traces: any[] = [];
  public httpDefaultTraces: any[] = [];
  private timestamp!: number;
  public pageSize = 10;
  public page = 1;

  constructor(
    private dashboardService: ActuatorService,
    private title: Title
    ) {}

  ngOnInit(): void {
    this.title.setTitle('E-commerce Imobiliaria: Actuator')
    this.getTraces();
    this.getSystemCpu();
    this.getSystemHealth();
    this.getProcessUpTime(true);
  }
  private getTraces(): void {
    this.dashboardService.getHttpTraces().subscribe((response: any) => {
      console.log(response.traces);
      this.processTraces(response.traces);
      this.initializeBarChart();
      this.initializePieChart();

    });
  }

  private processTraces(traces: any): void {
    this.traceList = traces;
    this.traceList.forEach((trace) => {
      switch (trace.response.status) {
        case 200:
          this.http200Traces.push(trace);
          break;
        case 400:
          this.http400Traces.push(trace);
          break;
        case 404:
          this.http404Traces.push(trace);
          break;
        case 500:
          this.http500Traces.push(trace);
          break;
        default:
          this.httpDefaultTraces.push(trace);
      }
    });
  }
  public onSelectTrace(trace: any): void {
    console.log(trace);

    this.selectedTrace = trace;
    document.getElementById('trace-modal')?.click();
  }

  private getSystemCpu(): void {
    this.dashboardService.getSystemCpu().subscribe((response: any) => {
      console.log(response);

      this.systemCpu = response;
    });
  }
  private getSystemHealth(): void {
    this.dashboardService.getSystemHealth().subscribe((response: any) => {
      console.log(response);

      this.systemHealth = response;
      this.systemHealth.components.diskSpace.details.free = this.formatBytes(
        this.systemHealth.components.diskSpace.details.free
      );
    });
  }

  private getProcessUpTime(isUpdateTime: boolean) {
    this.dashboardService.getProcessUpTime().subscribe(
      (response: any) => {
        this.timestamp = Math.round(response.measurements[0].value);
        this.processUpTime = this.formateUptime(this.timestamp);
        console.log(this.processUpTime);

        if (isUpdateTime) {
          this.updateTime();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onRefreshData(): void {
    this.http200Traces = [];
    this.http400Traces = [];
    this.http404Traces = [];
    this.http500Traces = [];
    this.getTraces();
    this.getSystemHealth();
    this.getSystemCpu();
    this.getProcessUpTime(false);
  }

  private initializeBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    return new Chart(ctx, {
      type: ChartType.BAR,
      data: {
        labels: ['200', '404', '400', '500'],
        datasets: [
          {

            data: [
              this.http200Traces.length,
              this.http404Traces.length,
              this.http400Traces.length,
              this.http500Traces.length,
            ],
            backgroundColor: [
              'rgb(40,167,69)',
              'rgb(0,123,255)',
              'rgb(253,126,20)',
              'rgb(220,53,69)',
            ],
            borderColor: [
              'rgb(40,167,69)',
              'rgb(0,123,255)',
              'rgb(253,126,20)',
              'rgb(220,53,69)',
            ],
            borderWidth: 3,
          },
        ],
      },    options: {
        plugins: {
            title: {
                display: true,
                text: [`Last 1000 Requests as of ${this.formatDate(new Date())}`],
                color: 'black'
            },
            legend: {
              display: false //This will do the task
           }
        }
    }
    });
  }

  private initializePieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    return new Chart(ctx, {
      type: ChartType.PIE,
      data: {
        labels: ['200', '404', '400', '500'],
        datasets: [
          {
            label: 'Response',
            data: [
              this.http200Traces.length,
              this.http404Traces.length,
              this.http400Traces.length,
              this.http500Traces.length,
            ],
            backgroundColor: [
              'rgb(40,167,69)',
              'rgb(0,123,255)',
              'rgb(253,126,20)',
              'rgb(220,53,69)',
            ],
            borderColor: [
              'rgb(40,167,69)',
              'rgb(0,123,255)',
              'rgb(253,126,20)',
              'rgb(220,53,69)',
            ],
            borderWidth: 3,
          },
        ],
      },    options: {
        plugins: {
            title: {
                display: true,
                text: [`Last 1000 Requests as of ${this.formatDate(new Date())}`]
            },

        }
    }
    });
  }


  private formatBytes(bytes: any): string {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = 2 < 0 ? 0 : 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  private formatDate(date: Date): string {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const year = date.getFullYear();
    if (dd < 10) {
      const day = `0${dd}`;
    }
    if (mm < 10) {
      const month = `0${mm}`;
    }
    return `${dd}/${mm}/${year}`;
  }

  private updateTime(): void {
    setInterval(() => {
      this.processUpTime = this.formateUptime(this.timestamp + 1);
      this.timestamp++;
    }, 1000);
  }

  private formateUptime(timestamp: number): string {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = timestamp % 60;
    return (
      hours.toString().padStart(2, '0') +
      'h' +
      minutes.toString().padStart(2, '0') +
      'm' +
      seconds.toString().padStart(2, '0') +
      's'
    );
  }
}
