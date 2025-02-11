import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix(process.env.API_PREFIX!)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Todo example')
    .setDescription('The todo API description')
    .setVersion('1.0')
    .addTag('todo-api')
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, documentFactory)

  await app.listen(process.env.PORT!)
}
bootstrap()
