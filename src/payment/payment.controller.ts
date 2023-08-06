import { AuthenticatedGuard } from './../auth/authenticated.guard';
import { MakePaymentDto } from './dto/make-payment.dto';
import { PaymentService } from './payment.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
    constructor(private PaymentService: PaymentService) {}

    @UseGuards(AuthenticatedGuard)
    @Post()
    makePayment(@Body() MakePaymentDto: MakePaymentDto) {
        return this.PaymentService.MakePayment(MakePaymentDto);
    }
}
