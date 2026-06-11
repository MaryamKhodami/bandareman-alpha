import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ message: "شناسه یافت نشد" }, { status: 400 });
    }
    const res = await fetch(`https://api1.renn.ir/store/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
    
  } catch (error) {
    console.error("Store API Proxy Error:", error);
    return NextResponse.json(
      { message: "خطا در برقراری ارتباط با سرور اصلی" },
      { status: 500 }
    );
  }
}
