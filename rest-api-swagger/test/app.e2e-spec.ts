import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ConfigService } from '@nestjs/config'

import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let configService: ConfigService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    configService = app.get(ConfigService)

    await app.init()
  })

  it('/ (GET)', () => {
    const port = configService.get<number>('PORT')
    const commonVar = configService.get<string>('COMMON_VAR')
    const res = `Hello World! (on port ${port}) <br> COMMON_VAR="${commonVar}"`

    return request(app.getHttpServer()).get('/').expect(200).expect(res)
  })
})
