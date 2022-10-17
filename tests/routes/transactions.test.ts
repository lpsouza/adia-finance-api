import request from 'supertest';
import app from '../../app';

const transactionTest = {
    type: 'DEBIT',
    date: new Date(),
    amount: -599,
    transactionId: '620dbeff-2b0c-4c7c-96eb-df231c801e2f',
    walletId: '634ccf8885eb1f055aa20b76',
    description: 'Debit test'
}

let id: string;

describe('POST /transactions', () => {
    it('should return a created app', async () => {
        const res = await request(app).post('/transactions').send(transactionTest);
        expect(res.status).toBe(201);
        expect(res.body.type).toEqual(transactionTest.type);
        expect(new Date(res.body.date)).toEqual(transactionTest.date);
        expect(res.body.amount).toEqual(transactionTest.amount);
        expect(res.body.transactionId).toEqual(transactionTest.transactionId);
        expect(res.body.walletId).toEqual(transactionTest.walletId);
        expect(res.body.description).toEqual(transactionTest.description);
        id = res.body._id;
    });
});

describe('GET /transactions', () => {
    it('should return a list of entrys', async () => {
        const res = await request(app).get('/transactions');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('GET /transactions/:id', () => {
    it('should return a entry', async () => {
        const res = await request(app).get(`/transactions/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.type).toEqual(transactionTest.type);
        expect(new Date(res.body.date)).toEqual(transactionTest.date);
        expect(res.body.amount).toEqual(transactionTest.amount);
        expect(res.body.transactionId).toEqual(transactionTest.transactionId);
        expect(res.body.walletId).toEqual(transactionTest.walletId);
        expect(res.body.description).toEqual(transactionTest.description);
    });
    it('should return entry not found', async () => {
        const res = await request(app).get(`/transactions/aaa`);
        expect(res.status).toBe(404);
    });
});

describe('PUT /transactions/:id', () => {
    it('should return a updated entry', async () => {
        transactionTest['customDescription'] = 'Test custom';
        const res = await request(app).put(`/transactions/${id}`).send(transactionTest);
        expect(res.body.type).toEqual(transactionTest.type);
        expect(new Date(res.body.date)).toEqual(transactionTest.date);
        expect(res.body.amount).toEqual(transactionTest.amount);
        expect(res.body.transactionId).toEqual(transactionTest.transactionId);
        expect(res.body.walletId).toEqual(transactionTest.walletId);
        expect(res.body.description).toEqual(transactionTest.description);
        expect(res.body.customDescription).toEqual(transactionTest['customDescription']);
    });
});

describe('DELETE /transactions/:id', () => {
    it('should return a deleted entry', async () => {
        const res = await request(app).delete(`/transactions/${id}`);
        expect(res.status).toBe(200);
    });
});
