"use client";

import { useChat } from "@ai-sdk/react";
import React, { useState, useRef, useEffect } from "react";
import ChatContainer from "@/components/ChatContainer";
import ChatHeaderContainer from "@/components/home/ChatHeaderContainer";
import ChatMessageArea from "@/components/home/ChatMessageArea";
import ChatInputAreaContainer from "@/components/home/ChatInputAreaContainer";
import { useSession } from "next-auth/react";
import AppBar from "@/components/AppBar";
import Login from "@/components/Login";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Chat = {
  _id: string;
  userId: string;
  createdAt: string;
  messages: Message[];
};

const Page = () => {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [ready, setReady] = useState(false);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch("/api/protected/history");
      const data = await res.json();
      setChats(data);
      setReady(true);
    };

    fetchChats();
  }, []);

  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: "/api/protected/chat",
    initialMessages: ready ? chats[0]?.messages ?? [] : [],
  });

  const onHandleSubmit = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => {
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
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return session ? (
    <>
      <AppBar></AppBar>
      <ChatContainer>
        <ChatHeaderContainer />
        <ChatMessageArea messages={messages} />
        
        <ChatInputAreaContainer
          input={input}
          handleInputChange={handleInputChange}
          onHandleSubmit={onHandleSubmit}
          files={files ?? null}
          setFiles={setFiles}
          fileInputRef={fileInputRef}
          imageInputRef={imageInputRef}
          status={!!status}
        />
      </ChatContainer>
    </>
  ) : (
    <Login />
  );
};

export default Page;
