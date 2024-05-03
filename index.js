const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = 3000;
const prisma = new PrismaClient();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("hello world");
})

app.post("/notes", (req, res) => {
    const { title, content } = req.body;

    if(!title || !content){
      return res.status(400).send({
        error: "true",
        message: "Ada field yang kosong"
      })
    }

    async function main() {
        const note = await prisma.note.create({
          data: {
            title: title,
            content: content,
          },
        })
        res.send({
          error: "false",
          message: "Catatan berhasil ditambahkan",
          data: note
        })
      }
      
      main()
        .then(async () => {
          await prisma.$disconnect()
        })
        .catch(async (e) => {
          console.error(e)
          await prisma.$disconnect()
          process.exit(1)
        })
});

app.get("/notes", (req, res) => {
    async function main() {
        const notes = await prisma.note.findMany()
        res.send({
          error: "false",
          data: notes
        })
      }
      
      main()
        .then(async () => {
          await prisma.$disconnect()
        })
        .catch(async (e) => {
          console.error(e)
          await prisma.$disconnect()
          process.exit(1)
        })
});

app.get("/notes/:id", (req, res) => {
  async function main() {
      const id = parseInt(req.params.id);
      const note = await prisma.note.findUnique({
        where:{
          id: id
        }
      })

      if(!note){
        return res.status(404).send({
          error: "true",
          message: "Catatan tidak ditemukan"
        })
      }

      res.send({
        error: "false",
        data: note
      })
    }
    
    main()
      .then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })
});

app.put("/notes/:id", (req, res) => {
  async function main() {
      const id = parseInt(req.params.id);
      const { title, content } = req.body;

      if(!title || !content){
        return res.status(400).send({
          error: "true",
          message: "Ada field yang kosong"
        })
      }

      const noteIsExist = await prisma.note.findUnique({
        where:{
          id: id
        }
      })

      if(!noteIsExist){
        return res.status(404).send({
          error: "true",
          message: "Catatan tidak ditemukan"
        })
      }

      const note = await prisma.note.update({
        where:{
          id: id
        },
        data: {
          title: title,
          content: content
        }
      })

      res.send({
        error: "false",
        message: "Catatan berhasil diubah"
      })
    }
    
    main()
      .then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })
});

app.patch("/notes/:id", (req, res) => {
  async function main() {
      const id = parseInt(req.params.id);
      const { title, content } = req.body;

      const noteIsExist = await prisma.note.findUnique({
        where:{
          id: id
        }
      })

      if(!noteIsExist){
        return res.status(404).send({
          error: "true",
          message: "Catatan tidak ditemukan"
        })
      }

      const note = await prisma.note.update({
        where:{
          id: id
        },
        data: {
          title: title,
          content: content
        }
      })

      res.send({
        error: "false",
        message: "Catatan berhasil diubah"
      })
    }
    
    main()
      .then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })
});

app.delete("/notes/:id", (req, res) => {
  async function main() {
      const id = parseInt(req.params.id);

      const noteIsExist = await prisma.note.findUnique({
        where:{
          id: id
        }
      })

      if(!noteIsExist){
        return res.status(404).send({
          error: "true",
          message: "Catatan tidak ditemukan"
        })
      }

      const note = await prisma.note.delete({
        where:{
          id: id
        }
      })

      res.send({
        error: "false",
        message: "Catatan berhasil dihapus"
      })
    }
    
    main()
      .then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})