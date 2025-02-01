import { SparklesIcon } from "lucide-react"
import { Button } from "../ui/button"

function ChatPrompts() {
    const prompts: string[] = [
        "Clean Accounts Field",
        "Mutual Funds Advisor",
        "Story Teller",
        "LinkedIn Post Creator",
        "Financial Advisor"
    ]

    return (
        <div className="mx-auto max-w-md flex flex-col justify-center items-center gap-8 pt-12">
            <div className="border p-2 rounded-2xl shadow-inner shadow-purple-200">
                <SparklesIcon className="h-8 w-8 " />
            </div>
            <div className="max-w-xs text-center">
                <h1 className="font-semibold text-3xl">Talk Data to Me</h1>
                <p className="text-muted-foreground text-sm">Choose a prompt below or write your own to start chatting with AI</p>
            </div>
            <div className="flex flex-col gap-4 text-center">
                <p className="text-muted-foreground text-sm font-normal">Ask about:</p>
                <div className="flex flex-row flex-wrap items-center justify-center  gap-2">
                    {prompts.map((prompt) => {
                        return <Button
                            key={prompt}
                            className="cursor-pointer font-normal rounded-3xl"
                            variant="outline">{prompt}</Button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ChatPrompts