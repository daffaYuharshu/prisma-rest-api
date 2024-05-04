const findNoteById = require("../repositories/findNoteById");

const getNoteById = async (id) => {

    const note = await findNoteById(id);

    if(!note){
        throw Error("Catatan tidak ditemukan");
    }

    return note;
}

module.exports = getNoteById;