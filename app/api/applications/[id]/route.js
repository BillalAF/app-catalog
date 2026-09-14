import { NextResponse } from "next/server";
import { getApplicationById } from "@/lib/applications";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const data = await getApplicationById(id);
    if (!data) {
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ data });
  } catch (error) {
    console.error(`[GET /api/applications/${id}]`, error);
    return NextResponse.json(
      { error: "Unable to load application." },
      { status: 500 }
    );
  }
}
