"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, X, ThumbsUp, ThumbsDown, ChevronRight, MapPin, Bus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Types for our messages
type MessageType = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isLoading?: boolean
  quickReplies?: QuickReply[]
}

type QuickReply = {
  id: string
  text: string
  action?: string
}

export function ChatbotPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Marrakech ITS Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: [
        { id: "q1", text: "Check bus status" },
        { id: "q2", text: "Find nearest station" },
        { id: "q3", text: "Report an issue" },
        { id: "q4", text: "Service hours" },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      setIsTyping(false)
      setMessages((prev) => [...prev, botResponse])
    }, 1500)
  }

  const handleQuickReply = (text: string) => {
    // Add user message from quick reply
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      setIsTyping(false)
      setMessages((prev) => [...prev, botResponse])
    }, 1500)
  }

  // Generate bot responses based on user input
  const generateBotResponse = (userInput: string): MessageType => {
    const input = userInput.toLowerCase()
    let response: MessageType = {
      id: Date.now().toString(),
      content: "I'm not sure how to help with that. Could you try rephrasing your question?",
      sender: "bot",
      timestamp: new Date(),
    }

    // Check bus status
    if (input.includes("bus status") || input.includes("check bus") || input.includes("bus")) {
      response = {
        id: Date.now().toString(),
        content:
          "I can help you check the status of any bus. Please provide the bus number or route you're interested in.",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Bus #1045" },
          { id: "r2", text: "Route 7" },
          { id: "r3", text: "Medina to Gueliz" },
        ],
      }
    }
    // Bus number specific response
    else if (input.includes("1045") || input.includes("bus #1045")) {
      response = {
        id: Date.now().toString(),
        content:
          "Bus #1045 is currently on Route 7, heading to Gueliz Station. It's running on schedule and will arrive at the next stop in approximately 3 minutes.",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Show on map" },
          { id: "r2", text: "Full schedule" },
        ],
      }
    }
    // Route specific response
    else if (input.includes("route 7") || input.includes("route7")) {
      response = {
        id: Date.now().toString(),
        content:
          "Route 7 is currently operating normally. There are 5 buses active on this route with an average delay of 2 minutes due to traffic near Menara Mall.",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Show on map" },
          { id: "r2", text: "Route stations" },
        ],
      }
    }
    // Find nearest station
    else if (input.includes("nearest station") || input.includes("find station") || input.includes("station near")) {
      response = {
        id: Date.now().toString(),
        content:
          "I can help you find the nearest station. Please share your location or tell me which area of Marrakech you're in.",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Share my location" },
          { id: "r2", text: "Medina area" },
          { id: "r3", text: "Gueliz" },
          { id: "r4", text: "Menara" },
        ],
      }
    }
    // Location specific response
    else if (input.includes("medina") || input.includes("jemaa")) {
      response = {
        id: Date.now().toString(),
        content:
          "The nearest station to the Medina is Jemaa el-Fnaa Station. It serves routes 1, 3, 5, and 7. The next bus arrives in 4 minutes.",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Show on map" },
          { id: "r2", text: "Station schedule" },
        ],
      }
    }
    // Report issue
    else if (input.includes("report") || input.includes("issue") || input.includes("problem")) {
      response = {
        id: Date.now().toString(),
        content: "I'm sorry to hear you're experiencing an issue. What type of problem would you like to report?",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Bus delay" },
          { id: "r2", text: "Station issue" },
          { id: "r3", text: "Driver feedback" },
          { id: "r4", text: "App problem" },
        ],
      }
    }
    // Service hours
    else if (
      input.includes("hours") ||
      input.includes("schedule") ||
      input.includes("time") ||
      input.includes("service hours")
    ) {
      response = {
        id: Date.now().toString(),
        content:
          "Our transport services operate from 5:30 AM to 11:30 PM daily. Peak hours with increased frequency are 7:00-9:00 AM and 5:00-7:00 PM.",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Holiday schedule" },
          { id: "r2", text: "Night buses" },
        ],
      }
    }
    // Greeting
    else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      response = {
        id: Date.now().toString(),
        content: "Hello! I'm your Marrakech ITS Assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "q1", text: "Check bus status" },
          { id: "q2", text: "Find nearest station" },
          { id: "q3", text: "Report an issue" },
          { id: "q4", text: "Service hours" },
        ],
      }
    }
    // Thank you
    else if (input.includes("thank") || input.includes("thanks")) {
      response = {
        id: Date.now().toString(),
        content: "You're welcome! Is there anything else I can help you with?",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Yes, another question" },
          { id: "r2", text: "No, that's all" },
        ],
      }
    }
    // Show on map
    else if (input.includes("show on map") || input.includes("map")) {
      response = {
        id: Date.now().toString(),
        content: "I've located this on the map. You can view it in the Live Map section of the dashboard.",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { id: "r1", text: "Open Live Map" },
          { id: "r2", text: "Thank you" },
        ],
      }
    }

    return response
  }

  return (
    <>
      {/* Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
          size="icon"
          aria-label="Chat with assistant"
        >
          <Bot className="h-5 w-5" />
        </Button>
      </div>

      {/* Chatbot Panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 right-6 z-50 flex h-[550px] w-[380px] flex-col overflow-hidden rounded-lg border bg-background shadow-xl",
            "transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-3 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-slate-900 dark:bg-primary">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Chatbot" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium">Marrakech ITS Assistant</h3>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                >
                  <div className="flex gap-2">
                    {message.sender === "bot" && (
                      <Avatar className="mt-1 h-8 w-8 bg-slate-900 dark:bg-primary">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Chatbot" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex flex-col gap-2">
                      <div
                        className={cn(
                          "max-w-[270px] rounded-lg px-3 py-2",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>

                      {/* Quick Replies */}
                      {message.quickReplies && message.quickReplies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {message.quickReplies.map((reply) => (
                            <Button
                              key={reply.id}
                              variant="outline"
                              size="sm"
                              className="h-auto py-1 text-xs"
                              onClick={() => handleQuickReply(reply.text)}
                            >
                              {reply.text.includes("Bus") ? (
                                <Bus className="mr-1 h-3 w-3" />
                              ) : reply.text.includes("map") || reply.text.includes("location") ? (
                                <MapPin className="mr-1 h-3 w-3" />
                              ) : reply.text.includes("schedule") || reply.text.includes("hours") ? (
                                <Clock className="mr-1 h-3 w-3" />
                              ) : (
                                <ChevronRight className="mr-1 h-3 w-3" />
                              )}
                              {reply.text}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <Avatar className="mt-1 h-8 w-8 bg-slate-900 dark:bg-primary">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Chatbot" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="max-w-[270px] rounded-lg bg-muted px-3 py-2">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Feedback buttons for the last bot message */}
          {messages.length > 1 && messages[messages.length - 1].sender === "bot" && (
            <div className="flex items-center justify-end gap-2 border-t border-b px-4 py-2 bg-slate-50/50 dark:bg-slate-800/50">
              <span className="text-xs text-muted-foreground">Was this helpful?</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-slate-50/30 dark:bg-slate-800/20">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90" disabled={inputValue.trim() === ""}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs">
                  Transport
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Schedules
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Support
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Powered by ITS AI</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 