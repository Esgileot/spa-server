import { Global, Module } from '@nestjs/common'
import { ApiConfigService } from 'src/modules/config/api-config.service'

const providers = [ApiConfigService]

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers]
})
class SharedModule {}

export { SharedModule }
