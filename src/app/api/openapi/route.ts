import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const specPath = join(process.cwd(), "public/api/openapi.json");

export async function GET() {
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  return NextResponse.json(spec, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}