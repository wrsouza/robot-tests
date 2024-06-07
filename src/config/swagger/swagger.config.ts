import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('NestJs with ApiKey')
    .setDescription('application with router prottection (api-key)')
    .setVersion('1.0.0')
    .addTag('MyApp')
    .addTag('Auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
};
