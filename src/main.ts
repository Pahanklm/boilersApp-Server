import * as session from 'express-session';
import * as passport from 'passport';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            secret: 'keyword',
            resave: false,
            saveUninitialized: false,
        })
    ),
        app.use(passport.initialize());
    app.use(passport.session());

        app.enableCors({
            credentials: true,
            origin: ["http://localhost:3000" , 'https://client-shop-production.up.railway.app'],
        })

    await app.listen(process.env.PORT || 3001);
}
bootstrap();
