const prisma = require("../database/prisma");

const editNote = async (id, {title, content}) => {
    await prisma.note.update({
        where:{
            id: id
        },
        data: {
            title: title,
            content: content
        }
    })
}

module.exports = editNote;