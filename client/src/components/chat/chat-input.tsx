import { useState } from "react"
import { SendIcon, WandSparklesIcon } from "lucide-react"
import { motion } from 'motion/react'

import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useAdjustHeight } from "@/hooks/use-adjust-height"


function ChatInput() {
    const [message, setMessage] = useState("")
    const { textareaRef, adjustHeight } = useAdjustHeight()

    const handleMessageOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight()
        setMessage(e.target.value)
    }

    return (
        <div className="w-full absolute bottom-0 sm:bottom-4">
            <div className="border sm:rounded-md bg-gray-100 p-2">
                <div className="relative">
                    <motion.div
                        initial={{ height: "auto" }}
                        animate={{ height: textareaRef.current?.style.height }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                        <Textarea
                            ref={textareaRef}
                            onChange={handleMessageOnChange}
                            className="pl-8 resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 overflow-y-auto"
                            placeholder="Ask AI a question or make request"
                            id="message-2" />
                    </motion.div>
                    <WandSparklesIcon className="absolute top-3 left-2 text-muted-foreground h-4 w-4" />
                </div>
                <div className="flex items-end justify-between">
                    <p className="text-xs text-gray-400 ml-2">{message.length}/2000</p>
                    <Button variant={message.length === 0 ? "ghost" : "default"} size="icon" disabled={message.length === 0}>
                        <SendIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatInput