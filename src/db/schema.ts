import { pgTable, integer, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar(),
    full_name: varchar(),
    password_hash: varchar(),
    role: varchar({enum: ["user", "mimin"]}),
    created_at: timestamp()
})

