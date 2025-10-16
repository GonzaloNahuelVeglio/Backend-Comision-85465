import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080")


describe("test con supertest",function(){
    describe("Test de mascotas",async function (){
        it("Enpoint para para crear mascotas", async function(){
            const pet = {
                name:'Mila',
                specie:'Gato',
                birthDate:'10/06/2025'
            }
            const response = await requester.post('/api/pets').send(pet)
            console.log(response)
            expect(response._body.payload).to.be.an("string")
            expect(response.body.status).to.be.equal("success")
        })

        it('Enpoint get pets',async function(){

            const {_body} =  await requester.get('/api/pets')
            expect(_body).to.have.property('status')
            expect(_body).to.have.property('payload')
            expect(_body.payload).to.be.an('array')
        })

        it('Endpoint put pets',async function(){
            const pet = {
                name:'Mila',
                specie:'Gato',
                birthDate:'10/06/2025'
            }
         const {_body:petCreatedBody} =  await requester.post('/api/pets').send(pet)

         const petUpdated = {
            name:"Pitu2"
         }
         const {_body:petUpdateBody} =  await requester.put(`/api/pets/${petCreatedBody.payload}`).send(petUpdated)
         expect(petUpdateBody.payload.name).to.be.not.equal(petUpdated.name)
        })



    })
})
