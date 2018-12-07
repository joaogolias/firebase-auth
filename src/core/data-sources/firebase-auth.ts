import { auth as Auth } from 'firebase'
export interface  FirebaseAuth {
    login(email: string, password: string): Promise<Auth.UserCredential>
    signup(email: string, password: string): Promise<Auth.UserCredential>
}