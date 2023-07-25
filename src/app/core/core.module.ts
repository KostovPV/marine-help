import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FindComponent } from './find/find.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FindComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule, RouterModule, SharedModule
  ],
  exports: [HeaderComponent, FooterComponent, FindComponent],
})
export class CoreModule { }
