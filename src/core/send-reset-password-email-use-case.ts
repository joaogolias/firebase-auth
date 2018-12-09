import { AuthDataSource } from "./data-sources/auth-data-source";

export class SendResetPasswordEmailUseCase {
    constructor(private authDataSource: AuthDataSource){}

    public async execute(email: string): Promise<string>{
        return this.authDataSource.sendPasswordResetEmail(email)
    }
}