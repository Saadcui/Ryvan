import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default function AdminPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return <AdminClient />;
}
