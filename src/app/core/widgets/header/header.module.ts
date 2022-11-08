import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



@NgModule({
  exports: [ HeaderComponent ],
  declarations: [ HeaderComponent ],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule,
  ]
})
export class HeaderModule { }
