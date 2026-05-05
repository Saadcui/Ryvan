import  db  from "@/lib/db";
import User from "@/models/User";
import { adminOnly } from "@/middleware/admin";
import { NextResponse } from "next/server";

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(req) {
  try {
    const admin = adminOnly(req);
    if (admin && typeof admin.status === 'number') return admin;

    await db();
    const { searchParams } = new URL(req.url);
    const page = toPositiveInt(searchParams.get('page'), 1);
    const requestedLimit = toPositiveInt(searchParams.get('limit'), 50);
    const limit = Math.min(requestedLimit, 100);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({})
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments({}),
    ]);

    return NextResponse.json({
      success: true,
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load users" },
      { status: 500 }
    );
  }
}
