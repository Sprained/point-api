import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { rootMongooseTestModule, closeInMongodConnection } from './utils'
import { AppModule } from './../src/app.module'
import { UserSchema } from './../src/users/users.schema'

describe('/POST company', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        AppModule
      ]
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await closeInMongodConnection()
  })

  it('Sucess create company', () => {
    const body = {
      corporateName: 'teste',
      email: 'teste@email.com',
      password: 'teste123',
      cnpj: '12345678901234',
      phone: '81999999999'
    }
    
    return request(app.getHttpServer())
      .post('/company')
      .send(body)
      .expect(201)
  })

  it('Conflict email', async () => {
    const body = {
      corporateName: 'teste',
      email: 'teste@email.com',
      password: 'teste123',
      cnpj: '12345678901234',
      phone: '81999999999'
    }

    await request(app.getHttpServer())
      .post('/company')
      .send(body)
      .expect(201)

    return request(app.getHttpServer())
      .post('/company')
      .send(body)
      .expect(409)
      .expect({
        statusCode: 409,
        message: 'Email already registered',
        error: 'Conflict'
      })
  })

  it('Conflict cnpj', async () => {
    const body = {
      corporateName: 'teste',
      email: 'teste@email.com',
      password: 'teste123',
      cnpj: '12345678901234',
      phone: '81999999999'
    }

    await request(app.getHttpServer())
      .post('/company')
      .send(body)
      .expect(201)

    body.email = 'teste2@email.com'

    return request(app.getHttpServer())
      .post('/company')
      .send(body)
      .expect(409)
      .expect({
        statusCode: 409,
        message: 'CNPJ already registered',
        error: 'Conflict'
      })
  })
})