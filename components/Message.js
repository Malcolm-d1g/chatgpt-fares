import Head from "next/head";
import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import Typed from "react-typed";
import Image from "next/image";
import Moment from "react-moment";

export default function Home() {
  // Using react hook (useState) to initiate the conversation in chat box
  const [lastListedMsg, setLastListedMsg] = useState([]);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: `Hello, I am Fares how can I help you? 

    Example type in How to apply for Public Health Pest Control?`,
    },
  ]);
  const [newmsges, setNewmsges] = useState(chatLog);

  // rerieving the message list and adding the new message to the list
  const addNewMsg = (newmsg) => {
    setNewmsges((prevMsgList) => {
      return [newmsg, ...prevMsgList];
    });
  };

  // This function is called when the user clicks on the send button or press enter key to send the message
  async function handlesubmit(event) {
    event.preventDefault();
    if (input.length) {
      let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
      setChatLog(chatLogNew);
      await setInput("");
      const messages = chatLogNew.map((message) => message.message);
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

      // This is the response from the GPT-3 model which is the chatbot also filtering the response to make it more readable
      //by removing unwanted characters and spliting the response into steps if the response is a list of steps and not a single message

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

  // This function is called when the user clicks on the new chat button to clear the chat history

  function clearChat() {
    setChatLog([]);
  }

  //This component is used to render the main chat box container and the side menu
  //also it is used to render the chat messages and the input field, and reneder the messages list decending order

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
                      onAddExpense={addNewMsg}
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

//This component is used to render the chat messages and it checks if the message is a list of steps or a single message
//if the message is a list of steps it will render the list of steps in a list format
//if the message is a single message it will render the message in a paragraph format
//also it checks if the message is from the user or from the chatbot to render the message in the right side of the chat box

const ChatMessage = ({ message }) => {
  console.log("message inside component", message.message);
  if (typeof message.message === "object") {
    //console.log("all objects");
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
