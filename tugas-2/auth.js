const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const request = require('supertest');
const expect = require('chai').expect;

const base_url = process.env.BASE_URL;
const valid_username = process.env.VALID_USERNAME;
const valid_password = process.env.VALID_PASSWORD;
const invalid_username = process.env.INVALID_USERNAME;
const invalid_password = process.env.INVALID_PASSWORD;

// console.log('url', base_url);
// console.log('username', valid_username);
// console.log('password', valid_password);

describe('authorization testing', function() {
    it('login with valid credentials', async function() {

        this.timeout(600000);

        let token = '';

        let header = {
            'Accept': 'application/json'
        }
        let body = {
            "username": `${valid_username}`,
            "password": `${valid_password}`
        }

        let response = await request(base_url).post('auth').set(header).send(body);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');

        authToken = response.body.token;

        console.log('token', authToken);
    })

    it('login with invalid credentials', async function() {

        let header = {
            'Accept': 'application/json'
        }
        let body = {
            "username": `${invalid_username}`,
            "password": `${invalid_password}`
        }

        let response = await request(base_url).post('auth').set(header).send(body);

        expect(response.body).to.have.property('reason');
        expect(response.body.reason).to.equal('Bad credentials');
    })


})
