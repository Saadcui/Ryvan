
import  db  from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

function trimValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req) {
  await db();
  const { email, password } = await req.json();
  const resolvedEmail = trimValue(email);
  const resolvedPassword = typeof password === 'string' ? password : '';

  if (!resolvedEmail || !resolvedPassword) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  const user = await User.findOne({ email: resolvedEmail });
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(resolvedPassword, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken(user);
  const res = NextResponse.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}

