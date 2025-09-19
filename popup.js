document.getElementById("send-button").addEventListener("click", async () => {
  const question = document.getElementById("question").value;
  const responseBox = document.getElementById("response");

  if (!question.trim()) {
    responseBox.textContent = "Veuillez poser une question.";
    return;
  }

  responseBox.textContent = "Chargement...";

  try {
    const apiKey = "TON_API"; // Remplace par ta clé API valide
    const payload = {
      model: "gpt-3.5-turbo", // Utilise un modèle chat
      messages: [
        { role: "system", content: "Tu es une IA utile." },
        { role: "user", content: question },
      ],
      max_tokens: 150,
      temperature: 0.7,
    };

    const apiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error(`Erreur API (${apiResponse.status}): ${errorText}`);
      responseBox.textContent = `Erreur : ${
        JSON.parse(errorText).error.message
      }`;
      throw new Error("Erreur lors de la requête à l'API OpenAI.");
    }

    const data = await apiResponse.json();
    responseBox.textContent = data.choices[0].message.content.trim();
  } catch (error) {
    responseBox.textContent = "Erreur lors de la communication avec l'IA.";
    console.error(error);
  }
});