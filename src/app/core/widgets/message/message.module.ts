import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  exports: [ MessageComponent ],
  declarations: [ MessageComponent ],
  imports: [
    NgbModule,
    CommonModule,
  ]
})
export class MessageModule { }
