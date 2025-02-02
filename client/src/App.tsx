import { useEffect, useRef, useState } from "react";
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
  const [messages, setMessages] = useState<Message[]>([]);
  const { messagesEndRef, scrollToBottom } = useScrollBottom()
  const [isStreaming, setIsStreaming] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null);

  const mockResponse = "I understand your question. Let me explain this in detail. React is a JavaScript library for building user interfaces. It lets you create reusable UI components that manage their own state.";

  const streamResponse = async (response: string) => {
    setIsStreaming(true);
    const newMessageId = messages.length + 2;

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Initialize streaming message
    setMessages(prev => [...prev, { id: newMessageId, text: "", sender: "assistant" }]);

    // Stream each character
    try {
      for (let i = 0; i < response.length; i++) {
        // Check if streaming has been aborted
        if (signal.aborted) {
          break;
        }

        await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(resolve, 25);

          // If aborted, clear timeout and reject
          signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new Error('Stream aborted'));
          });
        });

        setMessages(prev =>
          prev.map(msg =>
            msg.id === newMessageId
              ? { ...msg, text: response.slice(0, i + 1) }
              : msg
          )
        );
      }
    } catch (error) {
      if (error instanceof Error && error.message !== 'Stream aborted') {
        console.error('Streaming error:', error);
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleSubmit = async (message: string, setMessage: React.Dispatch<React.SetStateAction<string>>, resetHeight: () => void) => {

    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: message, sender: "user" }
      ]);
      setMessage("");
      resetHeight()
      await new Promise(resolve => setTimeout(resolve, 500));
      await streamResponse(mockResponse);
    }
  }


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {messages.length > 0 ? <ChatMessages messages={messages} /> :
          <ChatPrompts />
        }
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-4">
        <div className="flex flex-col items-center gap-2">
          <ChatInput handleSubmit={handleSubmit} isStreaming={isStreaming} handleStopGeneration={handleStopGeneration} />
          <p className="text-muted-foreground text-xs">AI can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  )
}

export default App
