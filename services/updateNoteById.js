const editNote = require("../repositories/editNote");
const getNoteById = require("./getNoteById");

const updateNoteById = async (id, {title, content}) => {
  
    await getNoteById(id);

    await editNote(id, {title, content});
}

module.exports = updateNoteById;