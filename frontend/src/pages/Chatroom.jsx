import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
// import { useSocket } from "../components/socketContext";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const Chat = () => {
  // const socket = useSocket();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      setConnectionStatus("connected");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setConnectionStatus("error");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setConnectionStatus("disconnected");
    });

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    const roomElement = document.getElementById("room");
    if (roomElement) {
      roomElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      socket.emit("join", username);
      setIsJoined(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!isJoined) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleJoin} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Join Anonymous Chat
            </h2>
            {connectionStatus === "error" && (
              <div className="text-red-500 text-center">
                Connection error. Please try again.
              </div>
            )}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full p-2 cursor-pointer text-white bg-blue-500 rounded hover:bg-blue-600"
              disabled={connectionStatus !== "connected"}
            >
              Join
            </button>
          </form>
          <button
            onClick={handleRefresh}
            className="w-full mt-4 p-2 cursor-pointer text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Unable to join chat? Click Here
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 max-w-4xl w-full mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <div id="room">
              <h2 className="text-xl font-bold">Chat Room</h2>
              <p className="text-gray-600">Welcome, {username}!</p>
            </div>
            <div
              className={`px-2 py-1 rounded ${
                connectionStatus === "connected"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {connectionStatus === "connected" ? "Connected" : "Disconnected"}
            </div>
          </div>

          <div className="flex-1 p-4 h-full overflow-scroll space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "system" ? "justify-center" : "flex-col"
                }`}
              >
                {msg.type === "system" ? (
                  <span className="text-gray-500 text-sm">{msg.content}</span>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{msg.username}</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="bg-blue-100 p-2 rounded-lg inline-block">
                      {msg.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={connectionStatus !== "connected"}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white cursor-pointer bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
                disabled={connectionStatus !== "connected"}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
