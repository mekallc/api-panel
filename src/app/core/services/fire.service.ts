import { Injectable } from "@angular/core";
import * as fs from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, switchMap } from 'rxjs';
import { Storage, ref, deleteObject, uploadBytes, uploadString, uploadBytesResumable, percentage, getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})

export class FireService {
  constructor(
    private fireStore: Firestore,
    private auth: AngularFireAuth,
    private storage: Storage,
  ) { }

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

  // Authentication
  async login(email: string, password: string) {
    try {
      const item: any = await this.auth.signInWithEmailAndPassword(email, password);
      return item.user;
    } catch(error: any) {
      return error.code;
    }
  }

  async forgotPassword(email: string) {
    try {
      await this.auth.sendPasswordResetEmail(email)
      return 'Correo electrónico enviado!';
    } catch(error: any) {
      return error.code;
    }
  }

  async logout() {
    this.auth.signOut();
  }

  async upload (folder: string, file: any | null): Promise<string | undefined> {
    let url: string | undefined;
    const extName = file.name.split('.');
    const currenName = Date.now() + '.' + extName.pop();
    const path = `${folder}/${ currenName }`;
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        await uploadBytesResumable(storageRef, file);
        url = await getDownloadURL(storageRef);
      } catch(e: any) {
        console.error(e);
      }
    }
    return url;
  };
}
