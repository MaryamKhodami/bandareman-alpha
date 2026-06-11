import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const cookie = req.headers.get("cookie") || "";

    const body = await req.json();

    const orderRes = await fetch("https://api1.renn.ir/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookie, 
      },
      body: JSON.stringify(body),
      cache: "no-store", 
    });

    const orderText = await orderRes.text();
    const orderData = JSON.parse(orderText); 

    if (!orderRes.ok) {
      console.error("Order API error:", orderRes.status, orderText);
      return new NextResponse(orderText, {
        status: orderRes.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const clearCartRes = await fetch("https://api1.renn.ir/cart/clear", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookie, 
      },
      cache: "no-store",
    });

    const clearCartText = await clearCartRes.text();

    if (!clearCartRes.ok) {
      console.error(
        "Failed to clear cart after order:",
        clearCartRes.status,
        clearCartText
      );
    } else {
      console.log("Cart cleared successfully after order.");
    }
    return new NextResponse(orderText, {
      status: orderRes.status,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("API /order proxy error:", error);
    return NextResponse.json(
      { message: "order proxy failed", details: String(error) },
      { status: 500 }
    );
  }
}
