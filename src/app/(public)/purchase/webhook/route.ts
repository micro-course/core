import { server } from "@/app/server";
import { ReceivePurchaseWebhookService } from "@/features/course-purchase/server";
import { NextResponse } from "next/server";
import { parse } from "qs";

const receivePurchaseWebhookService = server.get(ReceivePurchaseWebhookService);

export const POST = async (req: Request) => {
  const text = await req.text();
  const data: any = parse(text);

  const result = await receivePurchaseWebhookService.exec({
    data,
  });

  if (result.type === "error") {
    return NextResponse.json(
      { error: result.message },
      { status: result.code ? result.code : 400 },
    );
  } else {
    return NextResponse.json({ message: "success" });
  }
};
