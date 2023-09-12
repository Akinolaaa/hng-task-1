const request = require('supertest');
require('dotenv').config()
const mongoose = require('mongoose');
const app = require('../app');

describe("PERSONS", () => {
  let created;
  beforeEach(async () => {
    try {
      await mongoose.connect(process.env.DB_URI);
      console.log("test database connected");
    } catch (error) {
      console.log('could not connect database');
    }
  });

  afterAll(async () => {
    console.log(`test case completed`);
    await mongoose.disconnect();
    await mongoose.connection.close();  
  });

  //get all persons
  describe('Test GET /api?name=', ()=>{
    test('Without query-It should respond with 200 success', async ()=> {
      const response = await request(app).get('/api').expect(200);
    }, 100000);

    test('With query-It should respond with 200 success', async ()=> {
      const response = await request(app).get('/api?name=someone').expect(200);
    }, 100000);
  });

  //get single person
  describe('Test GET /api/:personId', ()=>{
    const validId = '64fef108ecd6b9fe4f0452da';
    const nonExistent = '84fef108ecd6b9fe4f0452da';
    const invalidId = '64fef108ecd6b9fe4f045';

    const validResponse = { name: 'update name' };
    const invalidIdResponse = { error: `id is not valid` };

    test('It should respond with 200 success', async ()=> {
      const response = await request(app)
        .get(`/api/${validId}`)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toMatchObject(validResponse)
    }, 100000);

    test('Invalid ID- It should respond with 400', async ()=> {
      const response = await request(app)
        .get(`/api/${invalidId}`)
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toMatchObject(invalidIdResponse)
    }, 100000);
    
    test('deleted ID-It should respond with 400', async ()=> {
      const response = await request(app)
      .get(`/api/${nonExistent}`)
      .expect(400)
      .expect('Content-Type', /json/);
    expect(response.body).toStrictEqual({ error: `no person exists with id ${nonExistent}` })
    }, 100000);
  });

  //create person
  describe('Test POST /api', ()=>{
    const validBody = { name: 'test person' };
    const inValidBody = { fame: 'test person' };
    const inValidBody2 = { name: 5 };

    test('Valid body-It should respond with 201 created', async ()=> {
      const response = await request(app)
        .post(`/api`)
        .send(validBody)
        .expect(201)
        .expect('Content-Type', /json/);
      expect(response.body).toMatchObject(validBody)
      created = response.body._id;
    })
    test('missing req field-It should respond with 400', async ()=> {
      const response = await request(app)
        .post(`/api`)
        .send(inValidBody)
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({ error: 'please include name' })
    }, 100000);

    test('name not string-It should respond with 400', async ()=> {
      const response = await request(app)
        .post(`/api`)
        .send(inValidBody2)
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toStrictEqual({ error: `name must be a string`})
    }, 100000);
  });

  //update person
  describe('Test PATCH /api/:personId', ()=>{
    const validId = '64fef108ecd6b9fe4f0452da';
    const nonExistent = '84fef108ecd6b9fe4f0452da';
    const invalidId = '64fef108ecd6b9fe4f045';

    const validResponse = { name: 'HNG name' };
    const invalidIdResponse = { error: `id is not valid` };
    const inValidBody2 = { name: 5 };

    test('Valid-It should respond with 200 success', async ()=> {
      const response = await request(app)
        .patch(`/api/${validId}`)
        .send(validResponse)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toMatchObject(validResponse)
    }, 100000);

    test('Invalid ID- It should respond with 400', async ()=> {
      const response = await request(app)
        .patch(`/api/${invalidId}`)
        .send(validResponse)
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toMatchObject(invalidIdResponse)
    }, 100000);

    test('name not string- It should respond with 400', async ()=> {
      const response = await request(app)
        .patch(`/api/${validId}`)
        .send(inValidBody2)
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toMatchObject({ error: `name must be a string`})
    }, 100000);
    
    test('deleted ID-It should respond with 400', async ()=> {
      const response = await request(app)
      .patch(`/api/${nonExistent}`)
      .send(validResponse)
      .expect('Content-Type', /json/);
    expect(response.body).toStrictEqual({ error: `no person exists with id ${nonExistent}` })
    }, 100000);
  });


   //delete person
  describe('Test DELETE /api/:personId', ()=>{
    const validId = '65008171e736821b778f9261';
    const nonExistent = '84fef108ecd6b9fe4f0452da';
    const invalidId = '64fef108ecd6b9fe4f045';

    const validResponse = {msg: 'person deleted successfully'};
    const invalidIdResponse = { error: `id is not valid` };

    test('Valid-It should respond with 200 success', async ()=> {
      const response = await request(app)
        .delete(`/api/${created}`)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toMatchObject(validResponse)
    }, 100000);

    test('Invalid ID- It should respond with 400', async ()=> {
      const response = await request(app)
        .delete(`/api/${invalidId}`)
        .expect(400)
        .expect('Content-Type', /json/);
      expect(response.body).toMatchObject(invalidIdResponse)
    }, 100000);
    
    test('deleted ID-It should respond with 400', async ()=> {
      const response = await request(app)
      .delete(`/api/${nonExistent}`)
      .expect('Content-Type', /json/);
    expect(response.body).toStrictEqual({ error: `no person exists with id ${nonExistent}` })
    }, 100000);
  })
})