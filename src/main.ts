import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import { TokenExpiredFilter } from './jwt/jwt.expired';
import { JsonWebTokenFilter } from './jwt/jwt.error';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* upload files and serve them */ 
  app.use('/uploads', serveStatic('uploads')); 

  /* swagger config for api docs */  
  const config = new DocumentBuilder()
    .setTitle('Micro hack backend')
    .setDescription('Api for micro hack ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  /* global filters */
  app.useGlobalFilters(new TokenExpiredFilter() , new JsonWebTokenFilter());

  /* enable cors */

  app.enableCors()

  await app.listen(3000);
}
bootstrap();