import { MakePaymentDto } from './dto/make-payment.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
    async MakePayment(MakePaymentDto: MakePaymentDto) {
        try {
            const { data } = await axios({
                method: 'POST',
                url: 'https://api.yookassa.ru/v3/payments',
                headers: {
                    'Content-Type': 'application/json',
                    'Idempotence-Key': Date.now(),
                },
                auth: {
                    username: '228652',
                    password:
                        'test_cgRqfaWhzSVpgc_SrYcLbyhtZtp-MjPFizmvJma9vWE',
                },
                data: {
                    amount: {
                        value: MakePaymentDto.amount,
                        currency: 'RUB',
                    },
                    capture: true,
                    confirmation: {
                        type: 'redirect',
                        return_url: 'http://localhost:3001/order',
                    },
                    description: 'zakaz 1',
                },
            });
            return data;
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }
}
