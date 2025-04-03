const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express(); // Corrigido - Criando a instância do Express

app.use(cors());

app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = "7935187245:AAFhCLNxb6JYnogRY9Lo3hJMZxtRvUp303c"; // Substitua pelo token real
const TELEGRAM_CHAT_ID = "-1002547541177"; // Substitua pelo ID real

app.post("/send-location", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ success: false, message: "Coordenadas inválidas." });
  }

  const message = `A localização do usuário é:\nLatitude: ${latitude}\nLongitude: ${longitude}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendLocation`, {
      chat_id: TELEGRAM_CHAT_ID,
      latitude,
      longitude
    });

    res.status(200).json({ success: true, message: "Localização enviada com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar a localização:", error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});
app.get("/", (req, res) => {
  res.send("Servidor rodando! 🚀");
});

app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});
