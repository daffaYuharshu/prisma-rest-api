const prisma = require("../database/prisma");

const insertNote = async (title, content) => {
    const note = await prisma.note.create({
        data: {
          title: title,
          content: content,
        },
    })

    return note;
}

module.exports = insertNote;