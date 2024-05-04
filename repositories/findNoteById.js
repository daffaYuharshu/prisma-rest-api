const prisma = require("../database/prisma");

const findNoteById = async (id) => {
    const note = await prisma.note.findUnique({
        where:{
          id: id
        }
    })

    return note;
}

module.exports = findNoteById;