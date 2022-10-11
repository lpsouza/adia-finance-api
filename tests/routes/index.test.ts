import request from 'supertest';
import app from '../../app';

describe('GET /', () => {
    it('should return a welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toEqual('Welcome to the A.D.I.A finance API.');
    });
});
