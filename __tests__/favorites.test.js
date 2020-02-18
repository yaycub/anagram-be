require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');
const Favorites = require('../lib/models/Favorites');

describe('Favorites Routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all favorite', async() => {
    const user = await User.create({ email: 'test@test.com', password: '123123' });
    await Favorites.create([
      { userId: user.id, word: 'hey' },
      { userId: user.id, word: 'hi' },
      { userId: user.id, word: 'why hello' }
    ]);
    const agent = request.agent(app);
    
    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'test@test.com', password: '123123' });

    
    return agent
      .get('/api/v1/favorites')
      .then(res => {
        expect(res.body).toEqual([
          { _id: expect.any(String), userId: user.id, word: 'hey', __v: 0 },
          { _id: expect.any(String), userId: user.id, word: 'hi', __v: 0 },
          { _id: expect.any(String), userId: user.id, word: 'why hello', __v: 0 }
        ]);
      });
  });

  it('can create a favorite', async() => {
    const user = await User.create({ email: 'test@test.com', password: '123123' });
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'test@test.com', password: '123123' });

    return agent
      .post('/api/v1/favorites')
      .send({ word: 'hey' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          userId: user.id,
          word: 'hey',
          __v: 0
        });
      });
  });
});
