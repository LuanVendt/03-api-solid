import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be abe to create a gym', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Academia do Zé',
                description: 'Academia do Zé é a melhor academia do mundo!',
                phone: '999999999',
                latitude: -27.8747279,
                longitude: -49.4889672,
            })


        expect(response.statusCode).toEqual(201)
    })
})
