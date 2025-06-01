import Button from "@/components/common/Button";
import { Mic, ImageIcon, Smile, Heart, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useChat } from "@/features/context/ChatContext";
import ChatInput from "@/components/chat/ChatInput"; // Import your external InputField component

interface Conversation {
  id: string;
  user?: {
    avatar?: string;
    name?: string;
  };
}

interface Message {
  id: string;
  senderId: string;
  text: string;
}

interface ChatContainerProps {
  conversation: Conversation;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ conversation }) => {
  const {
    messages,
    sendMessage,
    messagesEndRef,
    currentUserId,
    conversations,
  } = useChat();
  const navigate = useNavigate();

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      sendMessage(message);
    }
  };

  const handleConversationClick = () => {
    navigate(`/message/${conversation.id}`);
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <div
        className="flex items-center gap-3 p-4 border-b border-gray-700 cursor-pointer"
        onClick={handleConversationClick} // Navigate to the conversation on click
      >
        <img
          src={conversation.user?.avatar || "/placeholder.svg"}
          alt={conversation?.user?.name || "User"}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <h2 className="text-white font-medium">
          {conversation?.user?.name || "Unknown User"}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white ml-auto"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex items-end space-x-2 ${
              message.senderId === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message.senderId !== currentUserId && (
              <img
                src={conversation.user?.avatar || "/placeholder.svg"}
                alt={conversation.user?.name || "User"}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
                message.senderId === currentUserId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Section */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
