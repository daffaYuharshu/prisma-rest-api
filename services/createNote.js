const insertNote = require("../repositories/insertNote");

const createNote = async (title, content) => {
    const note = await insertNote(title, content);

    return note;
}

module.exports = createNote;