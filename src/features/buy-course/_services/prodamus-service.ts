import qs from "qs";
import { Hmac } from "@/shared/lib/hmac";
import { privateConfig } from "@/shared/config/private";
import { PaymentId, UserId } from "@/kernel";
import { publicConfig } from "@/shared/config/public";
import { Product } from "@/entities/payment/payment";

const baseUrl = privateConfig.PRODAMUS_URL ?? ``;

type Command = {
  paymentId: PaymentId;
  urlSuccess: string;
  urlReturn: string;
  userId: UserId;
  userEmail: string;
  products: Product[];
};

export class ProdamusService {
  constructor() {}

  async createLink({
    paymentId,
    products,
    userId,
    userEmail,
    urlReturn,
    urlSuccess,
  }: Command) {
    const params = {
      do: "link",
      customer_email: userEmail,
      urlReturn,
      urlSuccess,
      products: products.reduce((acc, product, i) => {
        return {
          ...acc,
          [i]: {
            name: product.name,
            sku: product.sku,
            price: product.price,
            quantity: String(product.quantity),
          },
        };
      }, {}),
      payments_limit: "1",
      _param_user_id: userId,
      _param_payment_id: paymentId,
      order_id: `${paymentId}-${products.map((p) => p.name).join(",")}`,
      installments_disabled: "1",
    };

    if (publicConfig.isDev) {
      Object.assign(params, {
        demo_mode: "1",
      });
    }

    const signature = this.createSignature({ paymentId });
    console.log({ signature, paymentId });
    const res = await fetch(this.formatUrl(baseUrl, params), {
      headers: {
        signature,
      },
    });
    return { url: await res.text() };
  }

  parseOrderId(orderId: string): PaymentId {
    return orderId.split("-")[0];
  }

  checkSignature({ paymentId, sign }: { sign: string; paymentId: PaymentId }) {
    return (
      Hmac.verify(
        {
          paymentId,
        },
        privateConfig.PRODAMUS_KEY ?? "",
        sign,
      ) || ""
    );
  }

  private createSignature({ paymentId }: { paymentId: PaymentId }) {
    return (
      Hmac.create(
        {
          paymentId,
        },
        privateConfig.PRODAMUS_KEY ?? "",
      ) || ""
    );
  }

  private formatUrl(url: string, params?: Record<string, unknown>) {
    const stringifiedParams = qs.stringify(params, {
      arrayFormat: "brackets",
      addQueryPrefix: true,
      encode: false,
    });

    return `${url}${stringifiedParams}`;
  }
}

export const prodamusService = new ProdamusService();
