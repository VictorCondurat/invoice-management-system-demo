import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = app.get(ConfigService);

  await app.register(cors, {
    origin: config.get<string>('CLIENT_URL'),
    credentials: true,
  });

  await app.register(cookie, {
    secret: config.get<string>('COOKIE_SECRET'),
  });

  await app.listen(config.get<number>('API_PORT') ?? 3000, '0.0.0.0');
}

bootstrap();
