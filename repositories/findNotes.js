const prisma = require("../database/prisma");

const findNotes = async () => {
    const notes = await prisma.note.findMany();

    return notes;
}

module.exports = findNotes;