import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddToCartDto {
    @IsNotEmpty()
    readonly username: string;

    @IsOptional()
    userId?: number;

    @IsNotEmpty()
    readonly partId: number;
}
