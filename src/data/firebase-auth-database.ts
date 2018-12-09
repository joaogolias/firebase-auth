import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import { getConfig } from '../config';
import { AuthDataSource, AuthInfo, AuthService, ThirdProvider } from '../core/data-sources/auth-data-source';

export class FirebaseAuthDatabase implements AuthDataSource{
    private user: firebase.User
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
              });
        }
    }
    
    public async signUpWithEmail(email: string, password: string): Promise<AuthInfo>{
        return new Promise<AuthInfo>(async (res, rej) => {
            try {
                const credential = await firebase.auth().createUserWithEmailAndPassword(email, password)
                const customToken = await admin.auth().createCustomToken(credential.user.uid)
        
                res(this.firebaseCredentialToAuthInfo(credential, customToken))
            } catch (err) {
                rej(err)
            }
        })
    }
    
    public async signInWithEmail(email: string, password: string): Promise<AuthInfo> {
        return new Promise<AuthInfo>(async (res, rej) =>  {
            try {
                const credential = await firebase.auth().signInWithEmailAndPassword(email, password)
                const customToken = await admin.auth().createCustomToken(credential.user.uid)

                res(this.firebaseCredentialToAuthInfo(credential, customToken))
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
    public async changePassword(token: string, refreshToken: string, newPassword: string): Promise<string> {
        await this.authenticate(token, refreshToken)
        await this.user.updatePassword(newPassword)
        return 'Password successfully changed'
    }

    public async authenticate(token: string, refreshToken: string): Promise<AuthInfo> {
        await firebase.auth().signInWithCustomToken(token)
        
        this.user = firebase.auth().currentUser

        return {
            id: this.user.uid,
            token,
            refreshToken: this.user.refreshToken,
            authService: AuthService.Firebase,
            thirdProvider: ThirdProvider.None
        }
    }
    
    public async signOut(token: string, refreshToken: string): Promise<void> {
        await this.authenticate(token, refreshToken)
        await firebase.auth().signOut()
    }

    public async refreshToken(refreshToken: string): Promise<string> {
        return ''
    }

    private async firebaseCredentialToAuthInfo(firebaseCredentials: firebase.auth.UserCredential, customToken?: string): Promise<AuthInfo> {
        const token = customToken || await firebaseCredentials.user.getIdToken()
        return {
            id: firebaseCredentials.user.uid,
            token,
            refreshToken: firebaseCredentials.user.refreshToken,
            authService: AuthService.Firebase,
            thirdProvider: ThirdProvider.None,
        }
    }
}