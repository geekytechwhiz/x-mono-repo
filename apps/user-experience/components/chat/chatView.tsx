import { useState, useRef, useEffect } from "react";
import ChatProvider from "./chatProvider";
import ChatComponent from "./chatComponent";
import { MessageType } from "./chatEnums";

export default function ChatView() {
  const [messages, setMessages] = useState<any>([]);
  const chatLogRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("Guest");

  useEffect(() => {
    const userLoginDetails = localStorage.getItem("userLoginDetails");
    if (userLoginDetails) {
      const userDetails = JSON.parse(userLoginDetails);
      setName(userDetails.data.name);
    }
  }, []);

  // useEffect(() => {
  //   console.log(publicRuntimeConfig.NEXT_PUBLISH_API_URL);
  //   console.log("test!!!!!!!!!!!!!!!!!!!!!!!");

  //   fetch(publicRuntimeConfig.NEXT_PUBLISH_API_URL + "delivery-engine", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       site_host: "dev",
  //     },
  //     body: JSON.stringify({
  //       query: query2,
  //     }),
  //   })
  //     .then((r) => r.json())
  //     .then((data) => console.log("data returned:", data));
  // }, []);

  const scrollToBottom = () => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addMessage = (message: string) => {
    const now = new Date();
    const hours = now.getHours();
    const hoursFormatted = now.getHours().toString().padStart(2, "0"); // To ensure double-digits
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const timeStamp = `${hoursFormatted}:${minutes} ${amOrPm}`;
    // Adding user message
    const userMessage = { text: message, messageType: MessageType.User, timeStamp: timeStamp };
    const tempMessages = [...messages, userMessage];
    setMessages(tempMessages);

    fetch(
      `https://x-generative-agent-ihp3lk4pra-uc.a.run.app/api/v4/process_message?message=${message}&uid=1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        switch (data.type) {
          case "list":
            const text = data.text.replace(/"/g, "");
            return {
              text: text,
              messageType: MessageType.ProductListing,
              timeStamp: timeStamp,
              items: data.items,
            };
          case "detail":
            return {
              text: data.text,
              messageType: MessageType.ProductDetail,
              timeStamp: timeStamp,
              item: data.item,
            };
          default:
            if (data.text) {
              return {
                text: data.text,
                messageType: MessageType.Bot,
                timeStamp: timeStamp,
              };
            } else {
              return {
                text: "I don't know what happened, could you reword that?",
                messageType: MessageType.Bot,
                timeStamp: timeStamp,
              };
            }
        }
      })
      .then((botMessage) => {
        setMessages([...tempMessages, botMessage]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main>
      <div className='chat-container' style={{ flexDirection: "column" }}>
        <div className='chat-log'>
          <ChatProvider messages={messages} name={name} />
        </div>
        <div className='chat-input'>
          <ChatComponent addMessage={addMessage} />
        </div>
      </div>
      <div ref={chatLogRef} />
    </main>
  );
}
