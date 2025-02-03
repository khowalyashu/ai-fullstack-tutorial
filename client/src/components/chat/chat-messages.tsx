import { Edit3Icon, SparklesIcon, WandSparklesIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { useState } from "react"
import { Message } from "@/App"
import ChatProgressSteps from "./chat-progress-steps"
import { AnimatePresence } from "motion/react"
import { motion } from "motion/react"

interface ShowEdit {
    id: number,
    show: boolean
}

interface ChatMessagesProps {
    messages: Message[]
    isStreaming: boolean
}

function ChatMessages({ messages, isStreaming }: ChatMessagesProps) {
    const [showEdit, setShowEdit] = useState<ShowEdit | null>(null)

    const toggleShowEdit = (id: number, value: boolean) => {
        setShowEdit({ id, show: value })
    }

    return (
        <div className="pt-12 mx-auto max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-4">
            {messages.map((message) => {
                return (
                    <div key={message.id} className="flex flex-col gap-2">
                        {message.sender === "user" && <div
                            onMouseEnter={() => toggleShowEdit(message.id, true)}
                            onMouseLeave={() => toggleShowEdit(message.id, false)}
                            className="flex items-start gap-4 p-4 relative">

                            <Avatar>
                                <AvatarFallback className="bg-primary text-primary-foreground">S</AvatarFallback>
                            </Avatar>

                            <p className="break-all">{message.text}</p>
                            {showEdit !== null && showEdit.show && showEdit.id === message.id && <Button variant={"ghost"} size={"icon"} className="absolute right-0 bottom-0">
                                <Edit3Icon className="text-muted-foreground" />
                            </Button>}
                        </div>}
                        {message.sender === "assistant" && <div className="px-4 flex items-start gap-4 rounded-lg mb-8">
                            <Avatar>
                                <AvatarFallback >
                                    <SparklesIcon className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Results</h4>
                                    <Button variant={"ghost"}>
                                        <WandSparklesIcon />
                                        <p>Show Steps</p>
                                    </Button>
                                </div>
                                <AnimatePresence>
                                    {isStreaming && message.text == "" ? <ChatProgressSteps key={"progress-steps"} /> :
                                        <motion.div 
                                        initial={false} 
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{delay: 0.5}}
                                        >
                                            <p>{message.text}</p>
                                        </motion.div>}
                                </AnimatePresence>
                            </div>
                        </div>}
                    </div>
                )
            })}
        </div>
    )
}

export default ChatMessages