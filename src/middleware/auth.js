import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export function auth(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
