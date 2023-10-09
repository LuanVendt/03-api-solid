import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/teste/create-and-authenticate-user'
import request from 'supertest'
import { beforeAll, describe, expect, it } from 'vitest'

describe('Validate Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be abe to validate a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow({})

        const gym = await prisma.gym.create({
            data: {
                title: 'Academia do Brunão',
                description: 'Academia do Brunão é a melhor academia do mundo!',
                phone: '999999999',
                latitude: -27.8747279,
                longitude: -49.4889672,
            }
        })

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id,
            }
        })

        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()


        expect(response.statusCode).toEqual(204)

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id,
            },
        })

        expect(checkIn.validate_at).toEqual(expect.any(Date))
    })
})
