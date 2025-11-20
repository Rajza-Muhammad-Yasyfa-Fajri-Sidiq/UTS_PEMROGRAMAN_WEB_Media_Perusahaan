const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

// READ ALL
app.get("/informasi", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data);
});

// READ BY ID
app.get("/informasi/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const item = data.find((x) => x.id == req.params.id);
  item ? res.json(item) : res.status(404).json({ message: "Tidak ditemukan" });
});

// CREATE
app.post("/informasi", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const newData = {
    id: Date.now(),
    judul: req.body.judul,
    konten: req.body.konten,
  };
  data.push(newData);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json(newData);
});

// UPDATE
app.put("/informasi/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json"));
  let item = data.find((x) => x.id == req.params.id);

  if (!item) return res.status(404).json({ message: "Tidak ditemukan" });

  item.judul = req.body.judul;
  item.konten = req.body.konten;

  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json(item);
});

// DELETE
app.delete("/informasi/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("data.json"));
  let newData = data.filter((x) => x.id != req.params.id);

  fs.writeFileSync("data.json", JSON.stringify(newData, null, 2));
  res.json({ message: "Data berhasil dihapus" });
});

// MENJALANKAN API
app.listen(3000, () => console.log("API berjalan di http://localhost:3000"));
