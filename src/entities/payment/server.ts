import { ContainerModule } from "inversify";
import { CreatePaymentService } from "./_services/create-payment";
import { ReceivePaymentService } from "./_services/receive-payment";
import { PaymentRepository } from "./_repository/payment";
import { GetPaymentService } from "./_services/get-payment";

export const PaymentEntityModule = new ContainerModule((bind) => {
  bind(PaymentRepository).toSelf();
  bind(CreatePaymentService).toSelf();
  bind(ReceivePaymentService).toSelf();
  bind(GetPaymentService).toSelf();
});

export { CreatePaymentService, ReceivePaymentService, GetPaymentService };
