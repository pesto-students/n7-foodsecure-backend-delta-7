import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';

const firebase_params = {
  type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderX509CertUrl: process.env.AUTH_PROVIDER,
  clientC509CertUrl: process.env.CLIENT_URL,
};

@Injectable()
export class FirebaseService {
  private defaultApp: any;
  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }

  async validate(token: string) {
    const firebaseUser: any = await this.getUserInfo(token);
    return firebaseUser ? firebaseUser.uid : firebaseUser;
  }

  async getUserInfo(token: string) {
    return await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .then((decodedToken) => {
        return decodedToken;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
