import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix — mesmo prefixo do Spring Boot (/api/v1)
  app.setGlobalPrefix('api/v1');

  // Validação automática via class-validator (equivalente ao @Valid do Spring)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS — mesmas origens permitidas do Spring Boot
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['*'],
    credentials: true,
  });

  // Swagger — acessível em http://localhost:3001/swagger-ui
  const config = new DocumentBuilder()
    .setTitle('CRUD Design System API — NestJS')
    .setDescription('Reusable CRUD Platform — NestJS Implementation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 NestJS backend running on http://localhost:${port}`);
  console.log(`📖 Swagger: http://localhost:${port}/swagger-ui`);
}

bootstrap();
