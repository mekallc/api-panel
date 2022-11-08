import { Component, Input } from '@angular/core';
import { ToastInterface } from './message.data';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() data!: ToastInterface;

}
