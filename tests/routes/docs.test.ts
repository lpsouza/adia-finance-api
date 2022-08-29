import * as request from 'supertest';
import app from '../../app';

describe('GET /docs', () => {
    it('should return a redirect to swagger', async () => {
        const res = await request(app).get('/docs');
        expect(res.status).toBe(301);
        expect(res.header.location).toEqual('/docs/');
    });
});
