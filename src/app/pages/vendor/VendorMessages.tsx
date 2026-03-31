import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router";
import {
  MessageCircle,
  Search,
  Send,
  Paperclip,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";

export const VendorMessages: React.FC = () => {
  const token = localStorage.getItem("token");

  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");

  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  /* ===============================
        FETCH CHAT LIST
  =============================== */

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          "https://gogatherhub.com:5000/api/messages/chats",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setChats(res.data.data);

        if (res.data.data.length > 0) {
          setSelectedChat(res.data.data[0].id);
        }
      } catch (error) {
        console.error("Chat fetch error:", error);
      }
    };

    fetchChats();
  }, []);

  /* ===============================
        FETCH MESSAGES
  =============================== */

  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `https://gogatherhub.com:5000/api/messages/${selectedChat}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setMessages(res.data.data);

        shouldAutoScroll.current = true;
      } catch (error) {
        console.error("Message fetch error:", error);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    const el = chatContainerRef.current;

    if (!el) return;

    const handleScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;

      shouldAutoScroll.current = nearBottom;
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);
  /* ===============================
        CHECK USER NEAR BOTTOM
  =============================== */

  const isNearBottom = () => {
    const el = chatContainerRef.current;
    if (!el) return false;

    return el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  };

  /* ===============================
        AUTO SCROLL
  =============================== */

  useEffect(() => {
    if (shouldAutoScroll.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  /* ===============================
        SEND MESSAGE
  =============================== */

  const sendMessage = async () => {
    if (!messageText.trim() || !selectedChat) return;

    try {
      const res = await axios.post(
        "https://gogatherhub.com:5000/api/messages",
        {
          bidId: selectedChat,
          message: messageText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMessages((prev) => [...prev, res.data.data]);

      shouldAutoScroll.current = true;

      setMessageText("");
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  /* ===============================
        FILTER CHATS
  =============================== */

  const filteredChats = chats.filter((chat) => {
    const customer =
      chat.Event?.CustomerProfile?.firstName?.toLowerCase() || "";

    const eventName = chat.Event?.name?.toLowerCase() || "";

    return (
      customer.includes(searchQuery.toLowerCase()) ||
      eventName.includes(searchQuery.toLowerCase())
    );
  });

  const activeChat = chats.find((c) => c.id === selectedChat);

  const customerName =
    activeChat?.Event?.CustomerProfile?.firstName || "Customer";

  const eventName = activeChat?.Event?.name || "Event";

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-[#16232A] mb-2">Messages</h1>

        <p className="text-[#16232A]/70">Communicate with your customers</p>
      </div>

      <div
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        style={{ height: "calc(100vh - 250px)" }}
      >
        <div className="grid grid-cols-12 h-full">
          {/* ===============================
                CHAT LIST
          =============================== */}

          <div className="col-span-12 md:col-span-4 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => {
                const name =
                  chat.Event?.CustomerProfile?.firstName || "Customer";

                const event = chat.Event?.name || "Event";

                return (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-4 border-b hover:bg-gray-50 ${
                      selectedChat === chat.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="h-12 w-12 bg-[#075056] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {name.charAt(0)}
                        </span>
                      </div>

                      <div className="flex-1 text-left">
                        <p className="font-semibold">{name}</p>

                        <p className="text-sm text-gray-500">{event}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===============================
                CHAT WINDOW
          =============================== */}

          <div className="col-span-12 md:col-span-8 flex flex-col">
            {activeChat ? (
              <>
                {/* CHAT HEADER */}

                <div className="p-4 border-b flex justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="h-10 w-10 bg-[#075056] rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {customerName.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold">{customerName}</p>

                      <p className="text-xs text-gray-500">{eventName}</p>
                    </div>
                  </div>

                  <Link to={`/vendor/events/${activeChat?.Event?.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      View Event
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>

                {/* ===============================
                        MESSAGES
                =============================== */}

                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender_id === userId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender_id === userId
                            ? "bg-[#075056] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}

                  {/* AUTO SCROLL TARGET */}

                  <div ref={bottomRef}></div>
                </div>

                {/* ===============================
                        INPUT BOX
                =============================== */}

                <div className="p-4 border-t flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Paperclip size={20} />
                  </button>

                  <input
                    type="text"
                    value={messageText}
                    placeholder="Type your message..."
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />

                  <Button
                    onClick={sendMessage}
                    disabled={!messageText.trim()}
                    className="bg-[#075056]"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />

                  <p className="text-gray-500">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
