// middleware.ts
import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const SECRET = "inirahasia"

export async function authMiddleWare(c: Context, next: Next){
    const auth = c.req.header('Authorization');
    if(!auth?.startsWith('Bearer ')) return c.json({error: 'Unauthoriztaion'}, 401); // cek ketersediaan auth

    const token = auth.split(' ')[1] // mengambil token

    try {
        const decoded = verify(token, SECRET) 
        c.set('jwtPayload', decoded)
        await next();
    } catch (error) {
        return c.json({error: 'Invalid token'}, 401)
    }
}