const prisma = require("../database/prisma");

const deleteNote = async (id) => {
    await prisma.note.delete({
        where:{
            id: id
        }
    })
}

module.exports = deleteNote;