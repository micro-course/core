import { injectable } from "inversify";
import { dbClient } from "@/shared/lib/db";
import { Payment } from "../_domain/types";
import { CourseId } from "@/kernel/domain/course";
import { UserId } from "@/kernel/domain/user";
import { PaymentId } from "@/kernel/domain/payment";

@injectable()
export class PaymentRepository {
  findCoursePayment(
    userId: UserId,
    courseId: CourseId,
  ): Promise<Payment | undefined> {
    return this.queryCoursePayment(userId, courseId).then((payment) => {
      if (!payment) {
        return undefined;
      }
      return this.dbPaymentToPayment(payment);
    });
  }

  findPaymentById(paymentId: PaymentId): Promise<Payment | undefined> {
    return dbClient.payment
      .findUnique({
        where: {
          id: paymentId,
        },
        include: {
          products: true,
        },
      })
      .then((payment) => {
        if (!payment) {
          return undefined;
        }
        return this.dbPaymentToPayment(payment);
      });
  }

  async save(payment: Payment): Promise<Payment> {
    return this.dbPaymentToPayment(
      await dbClient.payment.upsert({
        where: {
          id: payment.paymentId,
        },
        create: {
          userEmail: payment.userEmail,
          state: payment.state.type,
          userId: payment.userId,
          id: payment.paymentId,
          products: {
            createMany: {
              data: payment.products.map((product) => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                sku: product.sku,
                type: product.type,
              })),
            },
          },
        },
        update: {
          state: payment.state.type,
        },
        include: {
          products: true,
        },
      }),
    );
  }

  private dbPaymentToPayment(
    dbPayment: NotNull<
      Awaited<ReturnType<PaymentRepository["queryCoursePayment"]>>
    >,
  ): Payment {
    return {
      paymentId: dbPayment.id,
      userId: dbPayment.userId,
      userEmail: dbPayment.userEmail,
      products: dbPayment.products.map((product) => ({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        sku: product.sku,
        type: product.type,
      })),
      state: {
        type: dbPayment.state,
      },
    };
  }

  private queryCoursePayment(userId: UserId, courseId: CourseId) {
    return dbClient.payment.findFirst({
      where: {
        userId,
        products: { some: { type: "course", sku: courseId } },
      },
      include: {
        products: true,
      },
    });
  }
}

type NotNull<T> = T extends null ? never : T;
