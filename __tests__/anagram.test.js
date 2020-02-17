require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('anagram routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can get anagrams', () => {
    
    return request(app)
      .post('/api/v1/anagram')
      .send({ word: 'hi' })
      .then(res => {
        expect(res.body).toEqual(['hi']);
      });
  });
});
