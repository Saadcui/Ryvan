import { NextResponse } from "next/server";
import { auth } from "./auth";

export function adminOnly(req) {
  const user = auth(req);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  return user;
}
