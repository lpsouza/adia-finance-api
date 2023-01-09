import request from 'supertest';
import app from '../../app';

const entryTest = {
    balance: 5000.00,
    balanceDate: new Date(),
    walletId: '634ccf8885eb1f055aa20b76'
}

let id: string;

beforeAll(async () => {
    await request(app).head('/wallets');
});

describe('POST /entries', () => {
    it('should return a created entry', async () => {
        const res = await request(app).post('/entries').send(entryTest);
        expect(res.status).toBe(201);
        expect(res.body.balance).toEqual(entryTest.balance);
        expect(new Date(res.body.balanceDate)).toEqual(entryTest.balanceDate);
        expect(res.body.walletId).toEqual(entryTest.walletId);
        id = res.body._id;
    });
});

describe('GET /entries', () => {
    it('should return a list of entrys', async () => {
        const res = await request(app).get('/entries');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('GET /entries/:id', () => {
    it('should return a entry', async () => {
        const res = await request(app).get(`/entries/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.balance).toEqual(entryTest.balance);
        expect(new Date(res.body.balanceDate)).toEqual(entryTest.balanceDate);
        expect(res.body.walletId).toEqual(entryTest.walletId);
    });
    it('should return entry not found', async () => {
        const res = await request(app).get(`/entries/aaa`);
        expect(res.status).toBe(404);
    });
});

describe('PUT /entries/:id', () => {
    it('should return a updated entry', async () => {
        entryTest.balance = 1240.66;
        entryTest.balanceDate = new Date();
        const res = await request(app).put(`/entries/${id}`).send(entryTest);
        expect(res.status).toBe(200);
        expect(res.body.balance).toEqual(entryTest.balance);
        expect(new Date(res.body.balanceDate)).toEqual(entryTest.balanceDate);
        expect(res.body.walletId).toEqual(entryTest.walletId);
    });
});

describe('DELETE /entries/:id', () => {
    it('should return a deleted entry', async () => {
        const res = await request(app).delete(`/entries/${id}`);
        expect(res.status).toBe(200);
    });
});
