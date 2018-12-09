export interface  AuthDataSource {
    signInWithEmail(email: string, password: string): Promise<AuthInfo>
    signUpWithEmail(email: string, password: string): Promise<AuthInfo>
    signOut(token: string, refreshToken: string): Promise<void> 
    sendPasswordResetEmail(email: string): Promise<string>
    changePassword(token: string, refreshToken: string, newPassword: string): Promise<string>
    authenticate(token: string, refreshToken: string): Promise<AuthInfo>
    refreshToken(refreshToken: string): Promise<string>
}

export interface AuthInfo {
    id: string
    token: string
    refreshToken: string
    authService: AuthService
    thirdProvider: ThirdProvider
}

export enum AuthService {
    Cognito = 'Cognito',
    Firebase = 'Firebase'
}

export enum ThirdProvider {
    Facebook = 'facebook',
    Google = 'google',
    None = 'None'
}