export interface UserData {
    email: string!,
    password: string!
}

export interface User extends UserData {
    id?: number
}