import { NgModule } from "@angular/core";

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { LANGUAGE_CODE, PERSISTENCE, SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';

import { environment } from "src/environments/environment";
import { getStorage, provideStorage } from "@angular/fire/storage";

@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
  ],
  providers: [
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
    { provide: LANGUAGE_CODE, useValue: 'es' },
    { provide: PERSISTENCE, useValue: 'session' },
  ]
})
export class FireModule { }
