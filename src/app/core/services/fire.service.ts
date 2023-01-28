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

  getRoomBySoporte() {}
  getChatBySoporte(uid: string) {}
  sendMessageBySoporte(uid: string, message: string) {}
}
