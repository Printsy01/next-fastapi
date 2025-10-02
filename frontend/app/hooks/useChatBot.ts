import axios from "axios";
import { useState } from "react";

export function useChatbot() {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        message: text,
      });

      const reply = response.data.answer;

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err: any) {
      console.error("Erreur lors de l'envoi du message:", err);
      let errorMessage = "Erreur de connexion";
      if (err.response) {
        errorMessage = `Erreur HTTP: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "Impossible de contacter le serveur";
      }
      setMessages((prev) => [...prev, { sender: "bot", text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}
