import { Injectable } from '@angular/core';
import { Jobs } from './joms.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobsChanged = new Subject<Jobs[]>();

  private jobs: Jobs[] = [];
  constructor() { }
  
  getJobs() {
    return this.jobs.slice();
  }

  setJobs(jobs: Jobs[]) {
    this.jobs = jobs;
    this.jobsChanged.next(this.jobs.slice());
  }
}
