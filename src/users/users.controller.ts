import { AuthenticatedGuard } from './../auth/authenticated.guard';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Controller, Get } from '@nestjs/common';
import {
    Body,
    Header,
    HttpCode,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('content-type', 'application/json')
    createUser(@Body() createUserDto: createUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Header('content-type', 'application/json')
    login(@Request() req) {
        return { user: req.user, msg: 'logged in' };
    }

    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req) {
        return req.user;
    }

    @Get('/logout')
    logout(@Request() req) {
        req.session.destroy();
        return { msg: 'session has ended' };
    }

    @Get('/registration-location')
    @UseGuards(AuthenticatedGuard)
    async getRegistrationLocation(@Request() req) {
            const registrationLocation = await this.usersService.getRegistrationLocation(req.user.username);
            return registrationLocation;
    }

    @Post('/update-location')
    @UseGuards(AuthenticatedGuard)
    async updateLocation(
        @Request() req,
        @Body('currentCity') currentCity: string,
        @Body('currentStreet') currentStreet: string,
    ) {
        try {
            const { username } = req.user; // Получаем username из текущего пользователя
            const user = await this.usersService.findOne({ where: { username } });
            if (!user) {
                return { error: 'User not found.' };
            }

            await this.usersService.updateCurrentLocation(user.id, currentCity, currentStreet);
            return { message: 'Location updated successfully.' };
        } catch (error) {
            console.log(error);
            return { error: 'An error occurred while updating location.' };
        }
    }
}
