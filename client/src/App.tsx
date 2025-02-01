import ChatInput from "./components/chat/chat-input"
import ChatPrompts from "./components/chat/chat-prompts"

function App() {

  return (
    <>
      <div className="relative h-screen mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <ChatPrompts />
        <ChatInput />
      </div>
    </>
  )
}

export default App
