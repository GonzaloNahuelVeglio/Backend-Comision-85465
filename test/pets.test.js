import Pet from "../src/dao/Pets.dao.js";
import mongoose from "mongoose";
import { expect } from "chai";

mongoose.connect(`mongodb://localhost:27017`)



describe("Testing Pet dao", function(){
    before(function(){
        this.pets = new Pet()
    })

    it("El dao debe poder obtener los mascotas en forma de arraglo", async function(){
        const result = await this.pets.get()
        expect(result).to.be.an("array")
    })

    it("El Dao debe agregar correctamente un elemento a la base de datos",async function(){
        const pet = {
            name: "Pitu",
            specie: "Perro",
            birthDate: "2020-05-15"
        }
        const result = await this.pets.save(pet);
        expect(result.name).to.equal(pet.name)

    })
})
