import { Injectable } from "@angular/core";
import * as fs from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { map, Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FireService {
  constructor(private fireStore: Firestore) {}

  getChatByService(uid: string) {
    const query = fs.query(
      fs.collection(this.fireStore, `services/${uid}/chat`),
      fs.orderBy('createdAt')
    );
    return fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;
  }

  getRoomBySoporte() {
    const query = fs.query(
      fs.collection(this.fireStore, `soporte`),
      fs.orderBy('createdAt')
    );
    return fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;

  }
  getChatBySoporte(uid: string) {
    const query = fs.query(
      fs.collection(this.fireStore, `soporte/${uid}/chat`),
      fs.orderBy('createdAt', 'desc')
    );
    return fs.collectionData(query, { idField: 'id' }) as Observable<any[]>;

  }
  sendMessageBySoporte(uid: string, message: string) {
    const data: any = {
      message,
      type_user: 2,
      type_message: 'MSG',
      view_message: false,
      createdAt: fs.Timestamp.fromMillis(new Date().getTime())
    }
    const document = fs.collection(this.fireStore, `soporte/${uid}/chat`);
    return fs.addDoc(document, data);
  }
}
