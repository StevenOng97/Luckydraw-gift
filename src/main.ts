import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: '*',
  // });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4010,
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Lucky Draw Gift Service')
    .setDescription('Lucky Draw Gift Service API description')
    .setVersion('1.0')
    .addTag('luckydraw-gift')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.startAllMicroservices();
  await app.listen(8010);
}
bootstrap();
