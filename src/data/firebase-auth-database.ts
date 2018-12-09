import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import { getConfig } from '../config';
import { AuthDataSource, AuthInfo, AuthService, ThirdProvider } from '../core/data-sources/auth-data-source';

export class FirebaseAuthDatabase implements AuthDataSource{
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                credential: admin.credential.cert({
                    projectId: getConfig().firebase.projectId,
                    clientEmail: getConfig().firebase.clientEmail,
                    privateKey: getConfig().firebase.privateKey,
                }),
                apiKey: getConfig().firebase.apiKey,
              });
        }

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: getConfig().firebase.projectId,
                    clientEmail: getConfig().firebase.clientEmail,
                    privateKey: getConfig().firebase.privateKey,
                }),
                // apiKey: getConfig().firebase.apiKey,
              });
        }
    }
    
    public async signUpWithEmail(email: string, password: string): Promise<AuthInfo>{
        return new Promise<AuthInfo>(async (res, rej) => {
            try {
                const credential = await firebase.auth().createUserWithEmailAndPassword(email, password)
                res(this.firebaseCredentialToAuthInfo(credential))
            } catch (err) {
                rej(err)
            }
        })
    }
    
    public async signInWithEmail(email: string, password: string): Promise<AuthInfo> {
        return new Promise<AuthInfo>(async (res, rej) =>  {
            try {
                const credential = await firebase.auth().signInWithEmailAndPassword(email, password)
                res(this.firebaseCredentialToAuthInfo(credential))
            } catch (err) {
                rej(err)
            }
        })
    }

    public async sendPasswordResetEmail(email: string): Promise<string> {
        return new Promise<string>(async (res, rej) => {
            try {
                await firebase.auth().sendPasswordResetEmail(email)
                res(`Reset Password Email sent to ${email}`)
            } catch (err) {
                rej(err)
            }
        })
    }
    public async resetPassword(oldPassword: string, newPassword: string): Promise<string> {
        return ''
    }

    public async authenticate(token: string, refreshToken: string): Promise<AuthInfo> {
        return new Promise<AuthInfo>(async (res, rej) => {
            try {
                const info = await admin.auth().verifyIdToken(token)
                res({
                    id: info.uid,
                    token,
                    refreshToken,
                    authService: AuthService.Firebase,
                    thirdProvider: ThirdProvider.None,
                })
            } catch (err) {
                rej(err)
            }
        })
    }
    
    public async refreshToken(refreshToken: string): Promise<string> {
        return ''
    }

    private async firebaseCredentialToAuthInfo(firebaseCredentials: firebase.auth.UserCredential): Promise<AuthInfo> {
        const token = await firebaseCredentials.user.getIdToken()
        return {
            id: firebaseCredentials.user.uid,
            token,
            refreshToken: firebaseCredentials.user.refreshToken,
            authService: AuthService.Firebase,
            thirdProvider: ThirdProvider.None,
        }
    }
}