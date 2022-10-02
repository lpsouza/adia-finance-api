import * as request from 'supertest';
import app from '../../app';
import appCore from '../core/../../app';

const walletTest = {
    name: "Test Wallet",
    type: "bank",
    user: "user@email.com",
    bankId: 1,
    enabled: true
}

process.env.TOKEN_KEY = 'test';
process.env.ACCESS_TOKEN_LIFE_TIME = "3600"
process.env.REFRESH_TOKEN_LIFE_TIME = "864000"
const login = { email: 'teste@login.com', password: '123456' };
let token: string;
let id: string;
beforeAll(async () => {
    await request(appCore).post('/auth/register').send(login);
    const res = await request(appCore).post('/auth/login').send(login);
    token = res.body.access;
});
afterAll(async () => {
    await request(appCore).delete(`/auth/user/${login.email}`).set('Authorization', `Bearer ${token}`);
});

describe('POST /wallets', () => {
    it('should return a created app', async () => {
        const res = await request(app).post('/wallets').send(walletTest).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(201);
        expect(res.body.name).toEqual(walletTest.name);
        expect(res.body.type).toEqual(walletTest.type);
        expect(res.body.user).toEqual(walletTest.user);
        expect(res.body.bankId).toEqual(walletTest.bankId);
        expect(res.body.enabled).toEqual(walletTest.enabled);
        id = res.body._id;
    });
});

describe('GET /wallets', () => {
    it('should return a list of wallets', async () => {
        const res = await request(app).get('/wallets').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('GET /wallets/:id', () => {
    it('should return a wallet', async () => {
        const res = await request(app).get(`/wallets/${id}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toEqual(walletTest.name);
        expect(res.body.type).toEqual(walletTest.type);
        expect(res.body.user).toEqual(walletTest.user);
        expect(res.body.bankId).toEqual(walletTest.bankId);
        expect(res.body.enabled).toEqual(walletTest.enabled);
    });
});

describe('PUT /wallets/:id', () => {
    it('should return a updated wallet', async () => {
        walletTest.name = 'Test Wallet Updated';
        walletTest.user = 'other@login.com';
        const res = await request(app).put(`/wallets/${id}`).send(walletTest).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toEqual(walletTest.name);
        expect(res.body.type).toEqual(walletTest.type);
        expect(res.body.user).toEqual(walletTest.user);
        expect(res.body.bankId).toEqual(walletTest.bankId);
        expect(res.body.enabled).toEqual(walletTest.enabled);
    });
});

describe('DELETE /wallets/:id', () => {
    it('should return a deleted wallet', async () => {
        const res = await request(app).delete(`/wallets/${id}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
