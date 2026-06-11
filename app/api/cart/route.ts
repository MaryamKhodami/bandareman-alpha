import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api1.renn.ir/cart", {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API /cart proxy error:", error);
    return NextResponse.json(
      { message: "cart proxy failed" },
      { status: 500 }
    );
  }
}
