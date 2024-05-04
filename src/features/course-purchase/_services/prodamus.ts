import qs from "qs";
import { DataObject, Hmac } from "@/shared/lib/hmac";
import { privateConfig } from "@/shared/config/private";
import { injectable } from "inversify";
import { Product } from "@/entities/payment/_domain/types";
import { PaymentId } from "@/kernel/domain/payment";
import { UserId } from "@/kernel/domain/user";

const baseUrl = privateConfig.PRODAMUS_URL ?? ``;

type Command = {
  paymentId: PaymentId;
  urlSuccess: string;
  urlReturn: string;
  userId: UserId;
  userEmail: string;
  products: Product[];
};

@injectable()
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
    };

    if (privateConfig.PRODAMUS_DEMO_ENABLED) {
      Object.assign(params, {
        demo_mode: "1",
      });
    }

    const signature = this.createSignature({ paymentId });
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

  checkSignature({ data, sign }: { sign: string; data: DataObject }) {
    return Hmac.verify(data, privateConfig.PRODAMUS_KEY ?? "", sign) || "";
  }

  private createSignature(data: DataObject) {
    return Hmac.create(data, privateConfig.PRODAMUS_KEY ?? "") || "";
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
