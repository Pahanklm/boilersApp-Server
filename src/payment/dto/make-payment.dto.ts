import { IsNotEmpty, IsOptional } from 'class-validator';

export class MakePaymentDto {
  @IsNotEmpty()
  readonly amount: number;

  @IsOptional()
  readonly description?: string;
}