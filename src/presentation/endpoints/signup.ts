import { FirebaseAuthDatabase } from "../../data/firebase-auth-database"
import { auth as Auth } from 'firebase'
import { SignUpUseCase } from "../../core/sign-up-use-case"

export const SignUpHandler = async (input: any): Promise<Auth.UserCredential>  => {   
    const signupInput: SignUp = {
        email: input.email,
        password: input.password
    }

    const result = await new SignUpUseCase(new FirebaseAuthDatabase()).execute(signupInput)
    return result 
}

export interface SignUp {
    email: string
    password: string
}