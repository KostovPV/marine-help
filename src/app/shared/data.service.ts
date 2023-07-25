import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Jobs } from '../jobs/joms.model';
import { AuthService } from '../auth/auth.service';



@Injectable({ providedIn: 'root' })
export class DataStorageService {
  user: any;
  constructor(
    private http: HttpClient, private authService: AuthService
    
   
  ) {}

  getJobs() {
    const  apiUrl  = 'https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app';
    
    return this.http.get<Jobs[]>(`${apiUrl}/jobs.json`,
    {
      headers: new HttpHeaders({'Custom-header': 'Samo Levski'}),
      // params: new HttpParams().set('auth', this.user.token)
    }
    );
  }
}