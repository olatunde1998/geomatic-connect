"use client";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { Loader2, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Components } from "react-markdown";

interface ChatBotProps {
  toggleChat?: () => void;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function Chatbot({ toggleChat }: ChatBotProps) {
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/openai", id: "persistent-chat" });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const MarkdownComponents: Components = {
    code: ({ node, inline, className, children, ...props }: CodeProps) => {
      return inline ? (
        <code {...props} className="bg-gray-200 px-1 rounded">
          {children}
        </code>
      ) : (
        <pre {...props} className="bg-gray-200 p-2 rounded">
          <code>{children}</code>
        </pre>
      );
    },
    ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
    ol: ({ children }) => <li className="list-decimal ml-4">{children}</li>,
  };

  return (
    <div className="bg-green-400 text-black">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-2 z-50 w-[95%] md:w-[500px]"
        >
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold">Ask AI</CardTitle>
              <Button
                onClick={toggleChat}
                size="sm"
                variant="ghost"
                className="px-2 py-0"
              >
                <X className="size-4" />
                <span className="sr-only">Close Chat</span>
              </Button>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {messages.length === 0 && (
                  <p className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
                    No message Yet.
                  </p>
                )}
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-lg ${
                        message.role === "user"
                          ? "bg-[#014751] text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={MarkdownComponents}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="w-full items-center flex justify-center gap-3">
                    <Loader2 className="animate-spin h-5 w-5 text-green-400" />
                    <button
                      type="button"
                      className="underline"
                      onClick={() => stop()}
                    >
                      abort
                    </button>
                  </div>
                )}
                {error && (
                  <div className="w-full items-center flex justify-center gap-3">
                    <p>An error occurred.</p>
                    <button
                      type="button"
                      className="underline"
                      onClick={() => reload()}
                    >
                      Retry
                    </button>
                  </div>
                )}
                <div ref={scrollRef}> </div>
              </ScrollArea>
            </CardContent>

            <CardFooter>
              <form
                onSubmit={handleSubmit}
                className="flex items-center w-full space-x-2"
              >
                <Input
                  type="text"
                  placeholder="Type your message here..."
                  onChange={handleInputChange}
                  disabled={isLoading}
                  value={input}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                  className="size-9 bg-slate-700 rounded-full flex items-center justify-center"
                >
                  <Send className="size-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
