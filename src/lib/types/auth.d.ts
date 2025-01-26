declare type User = {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: string,
    isVerified: boolean,
    createdAt: string,
    passwordResetCode: string,
    passwordResetExpires: string,
    resetCodeVerified: boolean,
    passwordChangedAt: string
}

declare interface LoginResponse {
    token: string
    user: User,
}
