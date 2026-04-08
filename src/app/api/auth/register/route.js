import  db  from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signToken } from '@/lib/jwt';

function trimValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req) {
  await db();
  const { name, email, password } = await req.json();
  const resolvedName = trimValue(name);
  const resolvedEmail = trimValue(email);
  const resolvedPassword = typeof password === 'string' ? password : '';

  if (!resolvedName || !resolvedEmail || !resolvedPassword) {
    return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 });
  }

  if (!isValidEmail(resolvedEmail)) {
    return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
  }

  if (resolvedPassword.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email: resolvedEmail });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(resolvedPassword, 10);
  
  const newUser = await User.create({
    name: resolvedName,
    email: resolvedEmail,
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
    sameSite: "lax",
    path: "/",
  });

  return res;
}
