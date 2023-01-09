import request from 'supertest';
import app from '../../app';

const walletTest = {
    type: "bank",
    user: "user@email.com",
    bankId: 1,
    enabled: true
}

let id: string;

beforeAll(async () => {
    await request(app).head('/wallets');
});

describe('POST /wallets', () => {
    it('should return a created wallet', async () => {
        const res = await request(app).post('/wallets').send(walletTest);
        expect(res.status).toBe(201);
        expect(res.body.type).toEqual(walletTest.type);
        expect(res.body.user).toEqual(walletTest.user);
        expect(res.body.bankId).toEqual(walletTest.bankId);
        expect(res.body.bankName).not.toBeNull();
        expect(res.body.enabled).toEqual(true);
        id = res.body._id;
    });
});

describe('GET /wallets', () => {
    it('should return a list of wallets', async () => {
        const res = await request(app).get('/wallets');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('GET /wallets/:id', () => {
    it('should return a wallet', async () => {
        const res = await request(app).get(`/wallets/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.type).toEqual(walletTest.type);
        expect(res.body.user).toEqual(walletTest.user);
        expect(res.body.bankId).toEqual(walletTest.bankId);
        expect(res.body.bankName).not.toBeNull();
        expect(res.body.enabled).toEqual(true);
    });
    it('should return wallet not found', async () => {
        const res = await request(app).get(`/wallets/aaa`);
        expect(res.status).toBe(404);
    });
});

describe('GET /wallets/:id/entries', () => {
    it('should return a list of entries of the wallet', async () => {
        const res = await request(app).get(`/wallets/${id}/entries`);
        expect(res.status).toBe(200);
    });
});

describe('GET /wallets/:id/transactions', () => {
    it('should return a list of transactions of the wallet', async () => {
        const res = await request(app).get(`/wallets/${id}/transactions`);
        expect(res.status).toBe(200);
    });
});

describe('PUT /wallets/:id', () => {
    it('should return a updated wallet', async () => {
        walletTest.enabled = false;
        const res = await request(app).put(`/wallets/${id}`).send(walletTest);
        expect(res.status).toBe(200);
        expect(res.body.type).toEqual(walletTest.type);
        expect(res.body.user).toEqual(walletTest.user);
        expect(res.body.bankId).toEqual(walletTest.bankId);
        expect(res.body.bankName).not.toBeNull();
        expect(res.body.enabled).toEqual(false);
    });
});

describe('DELETE /wallets/:id', () => {
    it('should return a deleted wallet', async () => {
        const res = await request(app).delete(`/wallets/${id}`);
        expect(res.status).toBe(200);
    });
});
