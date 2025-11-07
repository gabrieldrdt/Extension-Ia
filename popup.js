document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-button");
  const questionEl = document.getElementById("question");
  const responseBox = document.getElementById("response");
  const saveKeyBtn = document.getElementById("save-key-button");
  const apiKeyInput = document.getElementById("api-key-input");

  let backendUrl = null;
  let storedKey = null;

  chrome.storage.sync.get(["backendUrl", "openaiKey"], (items) => {
    backendUrl = items.backendUrl || null;
    storedKey = items.openaiKey || null;

    if (apiKeyInput) apiKeyInput.value = storedKey || "";
  });

  function show(msg) {
    responseBox.textContent = msg;
  }

  async function saveKey(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ openaiKey: key }, () => {
        storedKey = key;
        resolve();
      });
    });
  }

  if (saveKeyBtn && apiKeyInput) {
    saveKeyBtn.addEventListener("click", async () => {
      const key = apiKeyInput.value.trim();
      if (!key) return alert("Clé vide.");
      await saveKey(key);
      alert("Clé OpenAI enregistrée (stockée localement).");
    });
  }

  async function sendQuestion(question) {
    show("⏳ Chargement...");

    try {
      if (backendUrl) {
        const res = await fetch(backendUrl.replace(/\/$/, "") + "/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });

        if (!res.ok) {
          const txt = await res.text();
          try {
            const j = JSON.parse(txt);
            throw new Error(j.error || JSON.stringify(j));
          } catch {
            throw new Error(`Erreur backend: ${res.status} ${txt}`);
          }
        }

        const data = await res.json();
        if (data?.choices?.[0]?.message?.content) {
          show(data.choices[0].message.content.trim());
        } else if (data.answer) {
          show(data.answer);
        } else {
          show(JSON.stringify(data).slice(0, 200));
        }
        return;
      }

      if (!storedKey) {
        const inputKey = window.prompt(
          "Aucune clé OpenAI détectée. Entre ta clé OpenAI (commence par sk-). Cette clé sera stockée localement."
        );
        if (!inputKey) {
          show("Aucune clé fournie — opération annulée.");
          return;
        }
        await saveKey(inputKey.trim());
      }

      const payload = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Tu es une IA utile et concise." },
          { role: "user", content: question },
        ],
        max_tokens: 300,
        temperature: 0.7,
      };

      const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!apiResponse.ok) {
        const errText = await apiResponse.text();
        console.error("OpenAI error raw:", errText);
        let msg = `Erreur OpenAI (${apiResponse.status})`;
        try {
          const parsed = JSON.parse(errText);
          msg = parsed.error?.message || msg;
        } catch {}
        show("❌ " + msg);
        return;
      }

      const data = await apiResponse.json();
      const answer = data.choices?.[0]?.message?.content?.trim();
      show(answer || "Aucune réponse reçue.");
    } catch (err) {
      console.error(err);
      show("Erreur lors de la communication avec l'IA.");
    }
  }

  sendBtn?.addEventListener("click", async () => {
    const question = questionEl?.value || "";
    if (!question.trim()) {
      show("Veuillez poser une question.");
      return;
    }
    await sendQuestion(question.trim());
  });

  questionEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
});
