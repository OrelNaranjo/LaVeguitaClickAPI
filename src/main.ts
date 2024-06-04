import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de prefijo global
  app.setGlobalPrefix('api/v1');

  // Implementación de Swagger
  const config = new DocumentBuilder()
    .setTitle('La VeguitaClick API')
    .setDescription('API para la empresa La VeguitaClick')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('support/api', app, document, {
    customSiteTitle: 'La VeguitaClick API',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // Implementación de CORS
  app.enableCors({ origin: 'http://localhost:4200' });

  // Implementación del servidor
  await app.listen(3000, () => {
    Logger.log(`Servidor corriendo en http://localhost:3000/api/v1`);
  });
}
bootstrap();
