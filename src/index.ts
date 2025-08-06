import { Context, Hono, Next } from "hono";
import { sign, verify, decode, jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import {bearerAuth} from 'hono/bearer-auth'
type Variables = JwtVariables;

const app = new Hono();

const SECRET = "inirahasia";

const fakeUser = [
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


// Public
app.get("/", (c) => c.text("Hello from Hono + JWT"));

export default app;
