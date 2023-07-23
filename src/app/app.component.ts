import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'marine-help';
constructor(private http: HttpClient){
}
ngOnInit(): void{
  this.http.get('https://rate-me-a5440-default-rtdb.europe-west1.firebasedatabase.app/Users/.json')
  .subscribe((Users)=>{
    console.log(Users);   
  })
}
}


