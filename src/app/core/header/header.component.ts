import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub?: Subscription;

  constructor(private authServise: AuthService){}

  ngOnInit(){
   this.userSub = this.authServise.user.subscribe(user=>{
    this.isAuthenticated = !user ? false : true;
    // console.log(!user);
    // console.log(!!user);
   });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    
    
  }
  onLogout() {
    this.authServise.logout();
  }
}
