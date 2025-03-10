import { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";
import output from "../assets/output.jpg";
import "./doco.css";

function Doco() {
  const [messages, setMessages] = useState([
    { text: "Hi, I'm Doco. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Auto-focus input field
  }, []);

  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I assist you today?";
    } else if (lowerCaseMessage.includes("appointment")) {
      return "You can book an appointment by selecting a date and time from the schedule.";
    } else if (lowerCaseMessage.includes("doctor")) {
      return "I can help you find a doctor. What specialization are you looking for?";
    } else {
      return "I'm not sure about that. Can you rephrase your question?";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages([...messages, { text: userMessage, sender: "user" }]);
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="doco-container">
      {/* Chat Window */}
      <div className="chat-container">
        <div className="chat-header">Doco - Virtual Assistant</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSend} className="send-btn">Send</button>
          <button className="call-btn"><FaPhoneAlt /></button>
          <button className="video-call-btn"><FaVideo /></button>
        </div>
      </div>

      {/* Floating Doco Avatar (Half-visible, properly positioned) */}
      <img src={output} alt="Doco AI" className="doco-avatar" />
    </div>
  );
}

export default Doco;
