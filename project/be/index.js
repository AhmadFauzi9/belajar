//const express = require("express");
import express from "express";
const app = express();
const port = 3000;

const logos = [
  {
    nama: "luffy",
    gambar:
      "https://cineverse.id/wp-content/uploads/2023/08/timeskip-one-piece-awal-mula-new-world.jpg",
  },
  {
    nama: "zoro",
    gambar:
      "https://cdn.oneesports.id/cdn-data/sites/2/2023/11/Anime_OnePiece_StrawHatPirates_RoronoaZoro_PostTimeskip_Wallpaper-1024x576-1.jpg",
  },
  {
    nama: "sanji",
    gambar:
      "https://cdn.oneesports.gg/cdn-data/2023/10/Anime_OnePiece_StrawHatPirates_Sanji_PostTimeskip_Wallpaper3.jpg",
  },
  {
    nama: "nami",
    gambar:
      "https://awsimages.detik.net.id/community/media/visual/2021/11/30/nami-one-piece.jpeg?w=1200",
  },
  {
    nama: "chopper",
    gambar:
      "https://i.pinimg.com/originals/23/62/50/236250f1055a352c4a0cd5e0a21aaf33.jpg",
  },
];

app.get("/", (req, res) => {
  res.send("Hello Coy oke!");
});

app.get("/logos", (req, res) => {
  console.log(req);
  res.json(logos.map((item)=> item.gambar));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
