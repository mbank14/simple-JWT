

export interface IUserPayload {
    id: number;
    username: string;
    password: string;
    role: "admin" | "user"
}