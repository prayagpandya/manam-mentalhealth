import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  const isAuthenticated = session?.value === "manam_authenticated_admin";

  return NextResponse.json({ authenticated: isAuthenticated });
}
