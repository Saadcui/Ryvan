import  db  from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signToken } from '@/lib/jwt';

export async function POST(req) {
  await db();
  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // sign token and set cookie so user is logged in immediately
  const token = signToken(newUser);
  const res = NextResponse.json({
    message: "User registered",
    user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
  }, { status: 201 });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
