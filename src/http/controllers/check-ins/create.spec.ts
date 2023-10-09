import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be abe to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'Academia do Brunão',
                description: 'Academia do Brunão é a melhor academia do mundo!',
                phone: '999999999',
                latitude: -27.8747279,
                longitude: -49.4889672,
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -27.8747279,
                longitude: -49.4889672,
            })


        expect(response.statusCode).toEqual(201)
    })
})
