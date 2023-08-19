import { IsNotEmpty, IsOptional } from 'class-validator';

export class CheckPaymentDto {
  @IsNotEmpty()
  readonly paymentId: number;

}