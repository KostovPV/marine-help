import { Component, OnInit } from '@angular/core';

import { Jobs } from '../joms.model';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})

export class JobsListComponent implements OnInit{
jobsList: Jobs[] = [];
  isLoading: boolean = true;

  constructor(
    private apiService: DataStorageService,
    private userService: AuthService
  ) {}

  get isLogged(): boolean {
    return this.userService.isLogged;
  }


  ngOnInit(): void {
    this.apiService.getJobs().subscribe({
      next: (jobs) => {
        this.jobsList = jobs;
        console.log(jobs);
        
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(`Error: ${err}`);
      },
    });
  }
}
