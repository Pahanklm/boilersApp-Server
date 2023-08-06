import { IsNotEmpty } from 'class-validator';

export class createUserDto {
    static password(password: any, arg1: number) {
        throw new Error('Method not implemented.');
    }
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly email: string;
    static username: string;
    static email: string;
}
