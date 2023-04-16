import { ApiConfigService, loadEnvConfig } from './api-config.service'

class FakeConfigService {
  private readonly configItems: Record<string, any>
  constructor() {
    this.configItems = loadEnvConfig()
  }

  get(key: string): any {
    return this.configItems[key]
  }
}

const apiConfigService = new ApiConfigService(new FakeConfigService() as any)
const dbConfig = apiConfigService.dbConfig

export default dbConfig
export { apiConfigService }
