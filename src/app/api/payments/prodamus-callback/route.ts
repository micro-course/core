import { NextResponse, NextRequest } from "next/server";
import qs from "qs";
import { z } from "zod";

const productSchema = z
  .object({
    name: z.string(),
    price: z.string(),
    quantity: z.string(),
    sum: z.string(),
  })
  .partial();

const mainSchema = z
  .object({
    date: z.string(),
    order_id: z.string(),
    order_num: z.string(),
    domain: z.string(),
    sum: z.string(),
    customer_phone: z.string(),
    customer_email: z.string().email(),
    customer_extra: z.string(),
    payment_type: z.string(),
    commission: z.string(),
    commission_sum: z.string(),
    attempt: z.string(),
    sys: z.string(),
    products: z.array(productSchema),
    payment_status: z.string(),
    payment_status_description: z.string(),
  })
  .partial(); // Делает все поля в главной схеме опциональными

export const dynamic = "force-dynamic";
export const POST = async (req: NextRequest) => {
  console.log(mainSchema.parse(qs.parse(await req.text())));
  return new NextResponse(JSON.stringify({ msg: "ok" }));
};
