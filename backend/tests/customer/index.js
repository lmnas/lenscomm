const request = require('supertest');
// user mock data
const mockUserData = {
    username: 'tester',
    email: 'tester@strapi.com',
    provider: 'local',
    password: '1234abc',
    confirmed: true,
    blocked: null,
  };
const mockCustomerData = {
    username: 'tester',
    email: 'tester@strapi.com',
    provider: 'local',
    password: '1234abc',
    confirmed: true,
    blocked: null,
  };
