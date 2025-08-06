// middleware.ts
import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { Variables } from "hono/types";

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

// fungsi untuk memberikan akses pada role tertentu
export function withRoles(roles: string[]) {
    return async function (c: Context<Variables>, next: Next) {
        const payload = await c.get('jwtPayload')
        console.warn(payload);
        if(!roles.includes(payload.role)) return c.json({error: 'Access denied'}, 403);
        await next()
    }
}