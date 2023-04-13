import Head from "next/head";
import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import Typed from "react-typed";
import Image from "next/image";
import Moment from "react-moment";

export default function Home() {
  const [lastListedMsg, setLastListedMsg] = useState([]);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: `Hello, I am Fares how can I help you? 

    Example type in How to apply for Public Health Pest Control?`,
    },
  ]);
  const [expenses, setExpenses] = useState(chatLog);

  const addNewExpense = (expense) => {
    setExpenses((prevExpanses) => {
      return [expense, ...prevExpanses];
    });
  };

  // useEffect(() => {
  //   getEngines();
  // }, []);

  // useEffect(() => {
  //   setLastListedMsg(chatLog[chatLog.length - 2].message);
  //   console.log("lastlist", lastListedMsg);
  // }, [chatLog]);

  async function handlesubmit(event) {
    event.preventDefault();
    if (input.length) {
      let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
      setChatLog(chatLogNew);
      await setInput("");
      const messages = chatLogNew.map((message) => message.message);
      // .join("\n")
      // .split(/(\d)/);
      console.log("messages===>", messages);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messages,
        }),
      });

      const data = await response.json();
      await setChatLog([
        ...chatLogNew,
        {
          user: "gpt",
          message: data.message?.includes("steps")
            ? data.message.split(/(\d+\. .*)/g).filter(function (elm) {
                return (
                  elm != null &&
                  elm !== false &&
                  elm !== "" &&
                  elm !== "\n" &&
                  elm !== "\n\n" &&
                  elm !== " "
                );
              })
            : data.message,
        },
      ]);
    }
    await setLastListedMsg(chatLog[chatLog.length - 1].message);
  }

  //console.log("msgbdy", lastListedMsg);

  function clearChat() {
    setChatLog([]);
  }
  //create a function to retreive all chatgpt models
  // function getEngines() {
  //   fetch("/api/generate", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("data =", data));
  // }

  return (
    <div className="App">
      <Head>
        <title>OpenAI Dubai Municiplaity</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className="main">
        <aside className="sidemenu">
          <div className="sideMenuButton" onClick={clearChat}>
            <span>+</span>
            New Chat
          </div>
        </aside>
        <section className="chatbox">
          <div className="chatMainCont">
            <div className="chatBorder">
              <div className="chatLog">
                {chatLog
                  ?.map((message, index) => (
                    <ChatMessage
                      key={index}
                      message={message}
                      onAddExpense={addNewExpense}
                    />
                  ))
                  .reverse()}
              </div>
              <div className="chatInputHolder">
                <form onSubmit={handlesubmit}>
                  <input
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="chatInputTextarea"
                    placeholder="start chating with Fares"
                  ></input>
                  <button type="submit" className="chatInputButton">
                    <Image
                      src={require("../public/send-message.png")}
                      height={20}
                      width={20}
                      alt="fares"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
const ChatMessage = ({ message }) => {
  console.log("message inside component", message.message);
  if (typeof message.message === "object") {
    console.log("all objects");
    return (
      <div className={`chatMessageCont ${message.user === "gpt" && "gptCont"}`}>
        <div className={`chatMessage ${message.user === "gpt" && "chatgpt"}`}>
          <div className="chatMessageCente">
            <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
              {message.user === "gpt" ? (
                <Image
                  src={require("../public/fares.png")}
                  height={39}
                  width={39}
                  alt="fares"
                  className="faresImage"
                />
              ) : (
                <Image
                  src={require("../public/user.png")}
                  height={39}
                  width={39}
                  alt="fares"
                  className="faresImage"
                />
              )}
            </div>
            <div className="message">
              {/* <Moment format="DD/MM/YYYY HH:mm">{new Date()}</Moment> */}
              {message.user === "gpt" ? (
                <ul className="stepList">
                  {message.message.map((msg, index) => (
                    <li key={index} className="arrayItem">
                      {msg}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{message.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`chatMessageCont ${message.user === "gpt" && "gptCont"}`}>
        <div className={`chatMessage ${message.user === "gpt" && "chatgpt"}`}>
          <div className="chatMessageCente">
            <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
              {message.user === "gpt" ? (
                <Image
                  src={require("../public/fares.png")}
                  height={39}
                  width={39}
                  alt="fares"
                  className="faresImage"
                />
              ) : (
                <Image
                  src={require("../public/user.png")}
                  height={39}
                  width={39}
                  alt="fares"
                  className="faresImage"
                />
              )}
            </div>
            <div className="message">
              {/* <Moment format="DD/MM/YYYY HH:mm">{new Date()}</Moment> */}
              {message.user === "gpt" ? (
                <p>
                  <Typed
                    strings={[`${message.message}`]}
                    typeSpeed={20}
                    smartBackspace={true}
                    className="typed"
                  />
                </p>
              ) : (
                <p>{message.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
