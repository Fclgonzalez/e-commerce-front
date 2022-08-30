import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SystemHealth } from '../../interface/system.health';
import { SystemCpu } from '../../interface/system.cpu';

@Injectable({
  providedIn: 'root'
})
export class ActuatorService {

  private url: string = 'https://api-nossolar.herokuapp.com/actuator';

constructor(private http:HttpClient) { }

  public getHttpTraces():Observable<any> {
    return this.http.get<any>(`${this.url}/httptrace`);
  }

  public getSystemHealth():Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.url}/health`);
  }

  public getSystemCpu():Observable<SystemCpu> {
    return this.http.get<SystemCpu>(`${this.url}/metrics/system.cpu.count`);
  }
  public getProcessUpTime():Observable<any> {
    return this.http.get<any>(`${this.url}/metrics/process.uptime`);
  }


}
