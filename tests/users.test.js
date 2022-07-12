
const { before } = require('lodash')
const request = require('supertest')
const app = require('../app')


// Run individual test files using command : jest users.test.js

// SIGN UP TEST
// SCENARIOS COVERED : 1. SUCCESSFUL SIGN UP WHEN CLIENT PROVIDES A NEW EMAIL ID , A USERNAME AND A PASSWORD
//                     2. UNSUCCESSFUL SIGN UP IF THE EMAIL ADDRESS ALREADY EXISTS IN THE DATABASE

describe ("Sign up test", () => {
    describe (" Given username, email and password ", () => {

        
        // the username, email and password should get saved to the database
        // should respond with a JSON object containing the user id
         test ("Providing sign in credntials and should respond with a 200 status code", async () => {
              const response = await request(app).post("/api/register").send({
                username : "usernamee",
                email : "email12345@gmail.com",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
         })

         test ("Providing duplicate email id and should respond with a 422 status code", async () => {
            const response = await request(app).post("/api/register").send({
            
              email : "email12345@gmail.com",
              password: "password"
          })
          expect(response.statusCode).toBe(422)
       })
        
    })

   
})


// LOGIN TEST
// SCENARIOS COVERED : 1. SUCCESSFUL SIGN IN WHEN EMAIL AND PASSWORD MATCH WITH THE DATABASE RECORD
//                     2. UNSUCCESSFUL SIGN IN WHEN CREDENTIALS DO NOT MATCH ANY DATABASE RECORD

describe("Login test", () => {
    describe("Given email and password", () => {
        test("Should respond with 200",  async () => {
            const response = await request(app).post("/api/authenticate").send({
              
              email : "email12345@gmail.com",
              password: "password"
          })
          expect(response.statusCode).toBe(200)
       })

       test("Providing wrong email and/or password. Should respond with 404",  async () => {
        const response = await request(app).post("/api/authenticate").send({
          
          email : "email123@gmail.com",
          password: "password123"
      })
      expect(response.statusCode).toBe(404)
   })

    })
})

// User profile : getting details of the logged in user info i.e username and email from the database
describe("User profile", () => {
    let token;
    beforeAll( async () => {
        const response = await request(app).post("/api/authenticate").send({ 
            email : "email12345@gmail.com",
            password: "password"
        })
       
        token = response.body["token"]
    })
    test("Send a request with a token", async () => {
        const response = await request(app).get("/api/userProfile").set('authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
    })
})

// User testing
afterAll(
async () => {
    const response = await request(app).post("/api/clearUsers")
    
    
}
  );