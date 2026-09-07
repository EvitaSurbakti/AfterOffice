const request = require('supertest');
const expect = require('chai').expect;

const expectedData = require('./expected_data.json');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const base_url = process.env.BASE_URL;

const valid_username = process.env.VALID_USERNAME;
const valid_password = process.env.VALID_PASSWORD;

let authToken;
let bookingId;

describe('create booking testing', function() {
    it.only('login with valid credentials', async function() {

        this.timeout(600000);

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
    })

    it('create booking with valid data', async function() {
        this.timeout(600000);

        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        let body = {
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
            "additionalneeds" : "Breakfast"
        }

        let response = await request(base_url)
            .post('booking')
            .set(header)
            .send(body);

        console.log('response', response.body);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('bookingid');
        expect(response.body).to.have.property('booking');

        bookingId = response.body.bookingid;

        const expectedDataPath = path.join(__dirname, 'expected_data.json');

        const jsonContent = JSON.stringify(response.body, null, 2);

        console.log('jsonContent', jsonContent);

        fs.writeFileSync(expectedDataPath, jsonContent, 'utf8');

    })

    it('get booking by id', async function() {
        this.timeout(600000);

        console.log('bookingId', bookingId);

        let header = {
            'Accept': 'application/json'
        }

        let responseGetBooking = await request(base_url)
            .get(`booking/${bookingId}`)
            .set(header);

        console.log('responseGetBooking', responseGetBooking.body);

        expect(responseGetBooking.status).to.equal(200);
        expect(responseGetBooking.body).to.deep.equal(expectedData.booking);
    })

    it('delete booking by id', async function() {
        this.timeout(600000);

        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': `token=${authToken}`
        }

        let responseDeleteBooking = await request(base_url)
            .delete(`booking/${bookingId}`)
            .set(header);

        console.log('responseDeleteBooking', responseDeleteBooking.body);

        expect(responseDeleteBooking.status).to.equal(201);
    })

    it.only('get booking by id after deletion', async function() {
        this.timeout(600000);

        let header = {
            'Accept': 'application/json'
        }

        let responseGetBookingAfterDeletion = await request(base_url)
            .get(`booking/${bookingId}`)
            .set(header);

        console.log('responseGetBookingAfterDeletion', responseGetBookingAfterDeletion.body);

        expect(responseGetBookingAfterDeletion.status).to.equal(404);
    })
})