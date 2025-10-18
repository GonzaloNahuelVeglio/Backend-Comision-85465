export default class PetDTO {
    static getPetInputFrom = (pet) =>{
        return {
            name:pet.name||'',
            specie:pet.specie||'',
            image: pet.image||'', 
            adopted:false
        }
    }
}