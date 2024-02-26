/* eslint-disable */
"use client";
import React, { useState, useRef } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { TextareaAutosize } from "@mui/material";

interface ChatComponentProps {
  addMessage: (message: string) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ addMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    // Handle sending the message logic here
    if (message !== "") {
      addMessage(message);

      setMessage("");
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the newline character from being added
      handleSendMessage();
    }
  };

  return (
    <div
      className='input-container'
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "10%",
        alignItems: "center",
        backgroundColor: "white",
        position: "absolute",
        justifyContent: "center",
        padding: "30px 10px 50px 10px",
        bottom: "0",
        left: "0",
      }}>
      <div
        className='w-full'
        style={{
          display: "flex",
          flexDirection: "row",
          width: "85%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "5px",
        }}>
        <TextareaAutosize
          className='text-area'
          placeholder={"Type your message here"}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleTextareaKeyDown}
          style={{
            textAlign: "justify",
            verticalAlign: "middle",
            padding: "14px 14px 0 10px",
            borderRadius: "2.5px",
            resize: "none",
            width: "70%",
            minHeight: "35px",
            margin: "10px 5px 10px 10px",
            flex: "1",
            border: "1px solid slategray",
            backgroundColor: "white",
          }}
        />
        <label
          htmlFor='file-input'
          className='border-2 border-slate-600 bg-white mt-2 p-2'
          style={{
            marginRight: "5px",
            right: "2px",
            maxHeight: "42px",
            borderLeft: "1px transparent",
            borderRight: "1px transparent",
            position: "absolute",
          }}></label>
      </div>
      <button
        className='send-button'
        onClick={handleSendMessage}
        disabled={message.length == 0 ? true : false}
        style={{
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "2.5px",
          width: "49px",
          height: "49px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: message.length == 0 ? "not-allowed" : "pointer",
          margin: "10px 10px 10px 2.5px",
        }}>
        <SendOutlinedIcon
          style={{ transform: "rotate(-45deg)", alignItems: "center", justifyContent: "center" }}
        />
      </button>
    </div>
  );
};

export default ChatComponent;
