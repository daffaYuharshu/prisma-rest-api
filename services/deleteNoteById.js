const deleteNote = require("../repositories/deleteNote");
const getNoteById = require("./getNoteById");

const deleteNoteById = async (id) => {
    await getNoteById(id);

    await deleteNote(id);
}

module.exports = deleteNoteById;