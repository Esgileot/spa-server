import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommentModule } from '../comment/comment.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApiConfigService, loadEnvConfig } from '../config/api-config.service'
import { SharedModule } from 'src/shared/shared-module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => configService.dbConfig
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvConfig]
    }),
    CommentModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
