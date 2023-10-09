import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be abe to list nearby gyms', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Academia do Zé',
                description: 'Academia do Zé é a melhor academia do mundo!',
                phone: '999999999',
                latitude: -27.2892852,
                longitude: -49.6481891,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Academia do Juninho',
                description: 'Academia do Juninho é a melhor academia do mundo!',
                phone: '999999999',
                latitude: -27.0618928,
                longitude: -49.5229501,
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -27.2892852,
                longitude: -49.6481891,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()


        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Academia do Zé',
            })
        ])
    })
})
