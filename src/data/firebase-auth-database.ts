import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
import { FirebaseAuth } from '../core/data-sources/firebase-auth'
import { getConfig } from '../config';

export class FirebaseAuthDatabase implements FirebaseAuth{
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                credential: admin.credential.cert({
                    projectId: getConfig().firebase.project_id,
                    clientEmail: getConfig().firebase.client_email,
                    privateKey: getConfig().firebase.private_key,
                }),
                apiKey: 'AIzaSyD4l8Ze6AWTVeJnUk4PUY7myZK66ZrAZ70',
              });
        }
    }
    
    public async signup(email: string, password: string): Promise<firebase.auth.UserCredential>{
        return new Promise<firebase.auth.UserCredential>(async (res, rej) => {
            try {
                const credential = await firebase.auth().createUserWithEmailAndPassword(email, password)
                res(credential) 
            } catch (err) {
                rej(err)
            }
        })
    }
    
    public async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return new Promise<firebase.auth.UserCredential>(async (res, rej) =>  {
            try {
                const credential = await firebase.auth().signInWithEmailAndPassword(email, password)
                res(credential)
            } catch (err) {
                rej(err)
            }
        })
    }
}