"use client";

import { useChat } from "@ai-sdk/react";
import React, { useState, useRef } from "react";
import ChatContainer from "@/components/ChatContainer";
import ChatHeaderContainer from "@/components/home/ChatHeaderContainer";
import ChatMessageArea from "@/components/home/ChatMessageArea";
import ChatInputAreaContainer from "@/components/home/ChatInputAreaContainer";

const Page = () => {
  const { messages, input, handleSubmit, handleInputChange, status } =
    useChat();
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef(null);
  
  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    if (files) {
      handleSubmit(event, {
        experimental_attachments: files,
      });
    } else {
      handleSubmit();
    }

    setFiles(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <ChatContainer>å
      <ChatHeaderContainer/>
      <ChatMessageArea messages={messages} />
      <ChatInputAreaContainer
        input={input}
        handleInputChange={handleInputChange}
        onHandleSubmit={onHandleSubmit}
        setFiles={setFiles}
        fileInputRef={fileInputRef}
        status={status}
      />
    </ChatContainer>
  );
};

export default Page;
