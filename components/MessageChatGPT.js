import React, { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/engines/davinci/jobs",
        {
          prompt: input,
          max_tokens: 100,
          n: 1,
          stop: ["User:"],
        }
      );
      setResponse(res.data.choices[0].text.split("User:")[0].trim());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{ width: "50%", backgroundColor: "#F2F2F2", padding: "1rem" }}
      >
        {response ? (
          <p style={{ margin: 0, padding: "0.5rem" }}>{response}</p>
        ) : null}
      </div>
      <form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here to chat with OpenAI GPT-3..."
          style={{ width: "100%", padding: "0.5rem", fontSize: "1.2rem" }}
        />
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatGPT;
