import { IsNotEmpty } from 'class-validator';

export class MakePaymentDto {
    @IsNotEmpty()
    readonly amount: number;
}
