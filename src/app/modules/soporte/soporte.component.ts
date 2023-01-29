import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FireService } from '@core/services/fire.service';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.scss']
})
export class SoporteComponent implements OnInit {

  uid!: string;
  text: string = '';
  rooms$!: Observable<any[]>;
  chats$!: Observable<any[]>;

  constructor(
    private fireService: FireService,
  ) { }

  ngOnInit(): void {
    this.getRooms();
  }

  sendPress(ev: any) {
    if (ev.keyCode === 13) {
      this.send();
    }
  }

  send() {
    if (this.text.length === 0) return;
    this.fireService.sendMessageBySoporte(this.uid, this.text);
    console.log(this.text);
  }

  getRooms() {
    this.rooms$ = this.fireService.getRoomBySoporte();
    this.rooms$.subscribe(res => console.log(res));
  }

  getChat(uid: string) {
    this.uid = uid;
    this.chats$ = this.fireService.getChatBySoporte(uid);
    this.chats$.subscribe(res => console.log(res));
  }
}
