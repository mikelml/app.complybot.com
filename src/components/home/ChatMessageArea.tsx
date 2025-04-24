"use client";

import React, { useEffect, useRef } from "react";
import { Typography, Stack } from "@mui/material";
import Message from "@/components/Message";
import Image from "next/image";
import MessageArea from "../messageArea";
import { format } from "date-fns";

const ChatMessageArea = ({ messages }) => {
  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <MessageArea ref={messageAreaRef}>
      <Stack>
        {messages.map((message, i) => (
          <Message key={i} isOwn={message.role === "user"}>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {message.content}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {format(new Date(), "HH:mm")}
            </Typography>
            <div>
              {message?.experimental_attachments
                ?.filter(
                  (attachment) =>
                    attachment?.contentType?.startsWith("image/") ||
                    attachment?.contentType?.startsWith("application/pdf")
                )
                .map((attachment, index) =>
                  attachment.contentType?.startsWith("image/") ? (
                    <Image
                      key={`${i}-${index}`}
                      src={attachment.url}
                      width={500}
                      height={500}
                      alt={attachment.name ?? `attachment-${index}`}
                    />
                  ) : attachment.contentType?.startsWith("application/pdf") ? (
                    <iframe
                      key={`${i}-${index}`}
                      src={attachment.url}
                      width="500"
                      height="600"
                      title={attachment.name ?? `attachment-${index}`}
                    />
                  ) : null
                )}
            </div>
          </Message>
        ))}
      </Stack>
    </MessageArea>
  );
};
export default ChatMessageArea;
