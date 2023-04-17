import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/main/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: process.env.FRONTEND_DOMAIN })
  await app.listen(8000)
}
bootstrap()
