import { IsNotEmpty, IsOptional } from 'class-validator';

export class createUserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly email: string;


    @IsOptional() 
    readonly registrationCity: string;

    @IsOptional() 
    readonly registrationStreet: string;

    @IsOptional() 
    readonly currentCity: string;

    @IsOptional() 
    readonly currentStreet: string;
}