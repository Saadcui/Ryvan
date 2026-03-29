import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import OrdersClient from "./OrdersClient";

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

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

  return <OrdersClient />;
}
