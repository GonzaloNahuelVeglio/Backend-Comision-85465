import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

// Variables para almacenar IDs de prueba
let testUserId;
let testPetId;
let testAdoptionId;

describe("Tests de Adopciones", function() {
    // Antes de las pruebas, creamos un usuario y una mascota para usar en las pruebas
    before(async function() {
        // Crear un usuario de prueba
        const userResponse = await requester.post('/api/users').send({
            first_name: "Usuario",
            last_name: "Test",
            email: `test_${Date.now()}@test.com`,
            password: "test123"
        });
        testUserId = userResponse.body.payload;

        // Crear una mascota de prueba
        const petResponse = await requester.post('/api/pets').send({
            name: "Mascota Test",
            specie: "Perro",
            birthDate: "2020-01-01"
        });
        testPetId = petResponse.body.payload;
    });

    describe("GET /api/adoptions", function() {
        it("Debe obtener todas las adopciones", async function() {
            const response = await requester.get('/api/adoptions');
            
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.property('status').that.equals('success');
            expect(response.body).to.have.property('payload').that.is.an('array');
        });
    });

    describe("POST /api/adoptions/:uid/:pid", function() {
        it("Debe crear una adopción correctamente", async function() {
            const response = await requester.post(`/api/adoptions/${testUserId}/${testPetId}`);
            
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.property('status').that.equals('success');
            expect(response.body).to.have.property('message').that.equals('Pet adopted');
            
            // Guardamos el ID de la adopción para usarlo en otras pruebas
            const adoptionsResponse = await requester.get('/api/adoptions');
            const adoptions = adoptionsResponse.body.payload;
            
            // Buscamos la adopción que acabamos de crear
            const adoption = adoptions.find(a => 
                a.owner.toString() === testUserId && 
                a.pet.toString() === testPetId
            );
            
            if (adoption) {
                testAdoptionId = adoption._id;
            }
        });

        it("Debe fallar al intentar adoptar una mascota que no existe", async function() {
            const nonExistentPetId = "60f1a5c2e6d5d1b2c3a4e5f6"; // ID que no existe
            const response = await requester.post(`/api/adoptions/${testUserId}/${nonExistentPetId}`);
            
            expect(response.status).to.be.equal(404);
            expect(response.body).to.have.property('status').that.equals('error');
            expect(response.body).to.have.property('error').that.equals('Pet not found');
        });

        it("Debe fallar al intentar adoptar con un usuario que no existe", async function() {
            const nonExistentUserId = "60f1a5c2e6d5d1b2c3a4e5f6"; // ID que no existe
            const response = await requester.post(`/api/adoptions/${nonExistentUserId}/${testPetId}`);
            
            expect(response.status).to.be.equal(404);
            expect(response.body).to.have.property('status').that.equals('error');
            expect(response.body).to.have.property('error').that.equals('user Not found');
        });

        it("Debe fallar al intentar adoptar una mascota ya adoptada", async function() {
            // La mascota ya fue adoptada en la primera prueba
            const response = await requester.post(`/api/adoptions/${testUserId}/${testPetId}`);
            
            expect(response.status).to.be.equal(400);
            expect(response.body).to.have.property('status').that.equals('error');
            expect(response.body).to.have.property('error').that.equals('Pet is already adopted');
        });
    });

    describe("GET /api/adoptions/:aid", function() {
        it("Debe obtener una adopción específica por ID", async function() {
            // Solo ejecutamos esta prueba si tenemos un ID de adopción
            if (testAdoptionId) {
                const response = await requester.get(`/api/adoptions/${testAdoptionId}`);
                
                expect(response.status).to.be.equal(200);
                expect(response.body).to.have.property('status').that.equals('success');
                expect(response.body).to.have.property('payload');
                expect(response.body.payload).to.have.property('_id').that.equals(testAdoptionId);
            } else {
                this.skip();
            }
        });

        it("Debe fallar al buscar una adopción que no existe", async function() {
            const nonExistentAdoptionId = "60f1a5c2e6d5d1b2c3a4e5f6"; // ID que no existe
            const response = await requester.get(`/api/adoptions/${nonExistentAdoptionId}`);
            
            expect(response.status).to.be.equal(404);
            expect(response.body).to.have.property('status').that.equals('error');
            expect(response.body).to.have.property('error').that.equals('Adoption not found');
        });
    });
 
    after(async function() { 
    });
});
