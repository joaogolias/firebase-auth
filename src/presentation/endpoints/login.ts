import { FirebaseAuthDatabase } from "../../data/firebase-auth-database"
import { LoginUseCase } from "../../core/login-use-case"
import { auth as Auth } from 'firebase'

export const LoginHandler = async (input: any): Promise<Auth.UserCredential>  => {   
    const loginInput: LoginInput = {
        email: input.email,
        password: input.password
    }

    const result = await new LoginUseCase(new FirebaseAuthDatabase()).execute(loginInput)
    return result 
}

export interface LoginInput {
    email: string
    password: string
}