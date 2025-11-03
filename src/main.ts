import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './logger/logger.service';
// import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('TodoApp API')
    .setDescription('API de exemplo com NestJS + Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Logger centralizado
  const logger = app.get(LoggerService);
  logger.info('App iniciada', 'Bootstrap');
  // Global Filter e Interceptor
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  // app.useGlobalInterceptors(new ResponseInterceptor(logger));

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);


  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  // Aqui você já sabe qual porta está rodando
  logger.info(`App rodando na porta ${port}`, 'Bootstrap');
}
bootstrap();
