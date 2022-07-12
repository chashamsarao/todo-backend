const request = require('supertest')
const app = require('../app')


let token;

beforeAll( async () => {
        const response = await request(app).post("/api/register").send({
        username : "usernamee",
        email : "email12345@gmail.com",
        password: "password"
    })
    const response_1 = await request(app).post("/api/authenticate").send({ 
        email : "email12345@gmail.com",
        password: "password"
    })
    token = response_1.body["token"]
})


 // ADDING A TODO 
let _id;

describe("Add a todo", () => {
    test("Providing", async () => {
        const response = await request(app).post("/user/todos").set('authorization', 'Bearer ' + token).send({
            title: "TODO Testing",
            desc : "Hello. I am a test",
            active : true,
            usedBy : request._id
        })
        expect(response.statusCode).toBe(200)
        

        // Setting id to use in the delete API
        _id = response._body._id; 
        console.log(`Todo id is : ${_id}`)
    })
})


    // Getting todos

    describe("Getting all todos of a particular user", () => {
            test("Request is made by the user", async () => {
                const response = await request(app).get("/user/todosGet").set('authorization', 'Bearer ' + token)
                expect(response.statusCode).toBe(200)
            })
    })

    // Delete a todo
    describe("Delete the todo", () => {
        
        test("Delete a todo", async() => {
            const response = await request(app).delete(`/user/todos/${_id}`)
            // .query({ "id" : todo_id})
            expect(response.statusCode).toBe(200)
        })
    })



