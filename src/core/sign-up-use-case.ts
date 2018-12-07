import { FirebaseAuth } from "./data-sources/firebase-auth";
import { LoginInput } from "../presentation/endpoints/login";
import { auth as Auth } from 'firebase'

export class SignUpUseCase {
    constructor(
        private firebaseAuth: FirebaseAuth
    ){}

    public async execute(input: LoginInput): Promise<Auth.UserCredential> {
        return this.firebaseAuth.signup(input.email, input.password)
    } 
}