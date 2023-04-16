import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { bool, cleanEnv, port, str } from 'envalid'
import { join } from 'path'
import { DataSourceOptions } from 'typeorm'

const loadEnvConfig = () => {
  cleanEnv(process.env, {
    APP_PORT: port(),
    DB_HOST: str(),
    DB_PORT: port(),
    DB_SSL: bool(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),
    ENABLE_DB_LOG: bool({ default: false })
  })
  return process.env
}

@Injectable()
class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return parseInt(this.configService.get('APP_PORT'), 10)
  }

  get dbHost(): string {
    return this.configService.get('DB_HOST')
  }

  get dbSync(): boolean {
    return /^true$/i.test(this.configService.get('DB_SYNC'))
  }

  get dbUseSSL(): boolean {
    return /^true$/i.test(this.configService.get('DB_SSL'))
  }

  get dbPort(): number {
    return parseInt(this.configService.get('DB_PORT'), 10)
  }

  get dbUserName(): string {
    return this.configService.get('DB_USERNAME')
  }

  get dbPassword(): string {
    return this.configService.get('DB_PASSWORD')
  }

  get dbDatabase(): string {
    return this.configService.get('DB_DATABASE')
  }

  get enableDbLog(): boolean {
    return this.configService.get('ENABLE_DB_LOG')
  }

  get appUrl(): string {
    return this.configService.get('APP_URL')
  }

  get dbConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.dbHost,
      port: this.dbPort,
      username: this.dbUserName,
      password: this.dbPassword,
      database: this.dbDatabase,
      synchronize: this.dbSync,
      ssl: this.dbUseSSL,
      logging: this.enableDbLog,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
      migrationsRun: true
    }
  }
}

export { ApiConfigService, loadEnvConfig }
