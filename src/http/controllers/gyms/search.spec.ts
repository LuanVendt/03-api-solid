import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Search Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be abe to search gyms by title', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Academia do Zé',
                description: 'Academia do Zé é a melhor academia do mundo!',
                phone: '999999999',
                latitude: -27.8747279,
                longitude: -49.4889672,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Academia do Juninho',
                description: 'Academia do Juninho é a melhor academia do mundo!',
                phone: '999999999',
                latitude: -27.8747279,
                longitude: -49.4889672,
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                q: 'Zé'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()


        expect(response.statusCode).toEqual(201)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Academia do Zé',
            })
        ])
    })
})
