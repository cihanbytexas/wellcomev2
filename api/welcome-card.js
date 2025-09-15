import { WelcomeCard } from "discord-welcome-card";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { username, avatarURL, serverName } = req.body;

  if (!username || !avatarURL || !serverName) {
    return res.status(400).json({ error: "Eksik veri!" });
  }

  try {
    const card = new WelcomeCard()
      .setUsername(username)
      .setAvatar(avatarURL)
      .setServerName(serverName);

    const buffer = await card.build();

    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: "Kart oluşturulamadı", details: err.message });
  }
}
