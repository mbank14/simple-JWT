import { Context, Hono, Next } from "hono";
import { sign, verify, decode, jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import {bearerAuth} from 'hono/bearer-auth'
import { authMiddleWare, SECRET, withRoles } from "./middleware";
import { IUserPayload } from "./type";
type Variables = JwtVariables;

const app = new Hono();
const fakeUser: IUserPayload[] = [
  {
    id: 1,
    username: "admin",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: "abcdef",
    role: "user",
  },
];

//auth 
app.post("/login", async (c) => {
  const {username, password } = await c.req.json()

  const user = fakeUser.find((u) => u.username === username && u.password === password)
  if(!user) return c.json({error: "Invalid"}, 401)
  
  const payload= {
    id: user.id,
    username: user.username,
    password: user.password,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60
  }
  const token = await sign(payload,SECRET)
  return c.json({token})

})


// Public
app.get("/", (c) => c.text("Hello from Hono + JWT"));
app.get("/jadwal", authMiddleWare, (c) => {
  return c.json({message: "Hallo semua "})
})
app.get("/admin/jadwal", authMiddleWare, withRoles(['admin']) ,(c) => {
  return c.json({message: "Hello admin "})
})

export default app;
