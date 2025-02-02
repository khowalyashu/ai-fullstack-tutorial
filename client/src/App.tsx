import { useEffect, useState } from "react";
import ChatInput from "./components/chat/chat-input"
import ChatMessages from "./components/chat/chat-messages"
import ChatPrompts from "./components/chat/chat-prompts"
import { useScrollBottom } from "./hooks/use-scroll-bottom";

export interface Message {
  id: number,
  text: string,
  sender: "user" | "assistant"
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello!", sender: "user" },
    {
      id: 2, text: `I've created a responsive chat layout with the following features:
  
  Fixed input area at the bottom
  Scrollable messages area that automatically scrolls to the latest message
  Different styling for user and assistant messages
  Responsive design that takes full height of the screen
  Simple message input form with submit button
  Sample messages to demonstrate the layout`, sender: "assistant"
    },
    { id: 3, text: "I have a question about React.", sender: "user" },
    { id: 4, text: "Sure, I'd be happy to help with React!", sender: "assistant" }
  ]);
  const {messagesEndRef, scrollToBottom} = useScrollBottom()

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
        {/* <ChatPrompts /> */}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-4">
        <div className="flex flex-col items-center gap-2">
          <ChatInput setMessages={setMessages} />
          <p className="text-muted-foreground text-xs">AI can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  )
}

export default App
