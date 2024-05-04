import { ContainerModule } from "inversify";
import { CreatePaymentService } from "./_services/create-payment";
import { ReceivePaymentService } from "./_services/receive-payment";
import { PaymentRepository } from "./_repository/user-access";

export const PaymentEntityModule = new ContainerModule((bind) => {
  bind(PaymentRepository).toSelf();
  bind(CreatePaymentService).toSelf();
  bind(ReceivePaymentService).toSelf();
});

export { CreatePaymentService, ReceivePaymentService };
