/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
const app = require('../app');
const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require('chai');

const host = 'http://localhost';
const port = '3001';
const url = `${host}:${port}`;

it('Customer Login Test', () => {
  chai
    .request(url)
    .post('/customer/login')
    .send({ email: 'rr@mail.com', password: 'test' })
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Restaurant Signup Test', () => {
  chai
    .request(url)
    .post('/restaurant/register')
    .send({
      name: 'Ajisen Ramen',
      email: 'ajisen@mail.com',
      password: 'test',
      location: 'San Francisco, CA 94103',
    })
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Current Restaurant Profile Test', () => {
  chai
    .request(url)
    .get('/restaurant/profile')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJ1c2VydHlwZSI6InJlc3RhdXJhbnQifSwiaWF0IjoxNjAyMTg0MDA5LCJleHAiOjE2MDgxODQwMDl9.6NoqC3_PZo32cpMpMAE60M_Bzv8FFVqGBArCR7Lf_GU',
    )
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Get All Restaurants Test', () => {
  chai
    .request(url)
    .get('/restaurant/profile/all')
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Get All Events Test', () => {
  chai
    .request(url)
    .get('/events')
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});
