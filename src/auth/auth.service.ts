import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly UsersService: UsersService) {}

    async validateUser(username: string, password: string) {
        const user = await this.UsersService.findOne({ where: { username } });
        if (!user) {
            throw new UnauthorizedException(
                'Такого пользователя не зарегестрировано'
            );
        }
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException('Не верный пароль');
        }
        if (user && passwordValid) {
            return {
                userID: user.id,
                username: user.username,
                email: user.email,
            };
        }
        return null;
    }
}
