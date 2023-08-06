import { sessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [UsersModule, PassportModule.register({ session: true })],
    providers: [AuthService, LocalStrategy, sessionSerializer],
})
export class AuthModule {}
