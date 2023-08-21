import { MakePaymentDto } from './dto/make-payment.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CheckPaymentDto } from './dto/check-payment.dto';

@Injectable()
export class PaymentService {
    async MakePayment(MakePaymentDto: MakePaymentDto) {
        try {
            const { data } = await axios({
                method: 'POST',
                url: ' https://api.yookassa.ru/v3/payments',
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
                        currency: 'UAH',
                    },
                    capture: true,
                    confirmation: {
                        type: 'redirect',
                        return_url: 'https://client-shop-production.up.railway.app/order',
                    },
                    description: MakePaymentDto.description,
                },
            });
            return data;
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    async checkPayment(checkPaymentDto: CheckPaymentDto) {
        try {
          const { data } = await axios({
            method: 'GET',
            url: `https://api.yookassa.ru/v3/payments/${checkPaymentDto.paymentId}`,
            auth: {
              username: '228652',
              password: 'test_cgRqfaWhzSVpgc_SrYcLbyhtZtp-MjPFizmvJma9vWE',
            },
          });
    
          return data;
        } catch (error) {
          throw new ForbiddenException(error);
        }
      }
    }