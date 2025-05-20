import { auth } from "@/auth";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  console.log(session);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
