const findNotes = require("../repositories/findNotes");

const getAllNote = async () => {
    const notes = await findNotes();

    return notes;
}

module.exports = getAllNote;