export interface  AuthDataSource {
    signInWithEmail(email: string, password: string): Promise<AuthInfo>
    signUpWithEmail(email: string, password: string): Promise<AuthInfo>
    signOut(token: string): Promise<void> 
    sendPasswordResetEmail(email: string): Promise<string>
    changePassword(token: string, newPassword: string): Promise<string>
    authenticate(token: string): Promise<AuthInfo>
    banUser(uid: string): Promise<string>
    unbanUser(uid: string): Promise<string>
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