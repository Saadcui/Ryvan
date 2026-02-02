import  db  from "@/lib/db";
import User from "@/models/User";
import { adminOnly } from "@/middleware/admin";
import { NextResponse } from "next/server";

export async function GET(req) {
  const admin = adminOnly(req);
  if (admin && typeof admin.status === 'number') return admin;

  await db();
  const users = await User.find().select("-password");

  return NextResponse.json(users);
}
