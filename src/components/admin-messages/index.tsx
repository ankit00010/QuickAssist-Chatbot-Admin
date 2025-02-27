"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import "./style.css";
import CustomInputField from "../input-fields/custom_fields";
import EmojiPicker from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import {  PacmanLoader } from "react-spinners";
import { AdminMessageResponse } from "@/types/admin_message_response";

const AdminMessageBody = () => {
  const { adminSendMessage } = useContext(AdminContext) as AdminContextType;
  const [message, setMessage] = useState("");

  //Loading state
  const [loading, setLoading] = useState(false);

  //Message
  const [result, setResult] = useState<AdminMessageResponse>({
    code: 0,
    title: "",
    message: "",
    details: {
      totalUsers: 0,
      successCount: 0,
      failureCount: 0,
    },
  });

  const [formattedMessage, setFormattedMessage] = useState("");

  const [open, setOpen] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null); // Reference for emoji picker
  const handleChange = (field: string, value: string | number) => {
    const inputMessage = value as string;
    setMessage(inputMessage);

    const formatted = inputMessage
      .replace(/\\n/g, "\n") // Convert "\n" string to actual new lines
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // Convert **text** to bold

    setFormattedMessage(formatted);
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setFormattedMessage((prev) => prev + emojiObject.emoji);
    setOpen(false); // Close picker after selecting emoji
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!message) {
      alert("Enter the message ");
      return;
    }else{

    console.log("Message sending....");
    setLoading(true);

    const result = await adminSendMessage(message);
    setResult(result);
    setLoading(false);
    setMessage("");
    setFormattedMessage("");
    setTimeout(() => {
      setResult({
        code: 0,
        title: "",
        message: "",
        details: {
          totalUsers: 0,
          successCount: 0,
          failureCount: 0,
        },
      });
    }, 10000);
    console.log("Message sent Successfully....");
  }

  };

  return (
    <div className="message-body-container">
      {/* Left Side - Input Field */}
      <div className="input-container">
        <span className="label">Body</span>
        <CustomInputField
          value={message}
          onChange={(value) => handleChange("message", value)}
          placeholder="Enter Message Here (Use \\n for new line, **text** for bold)"
          type="textarea"
          errorMessage="Please enter message here"
          required={true}
        />

        {/* Emoji Picker Button */}
        <button className="emoji-button" onClick={() => setOpen(!open)}>
          😀
        </button>

        {result.code !== 0 && !message&& (
          <div className="details-container">
            <h3 className="details-title">Details</h3>
            <div className="details-content">
              <p>
                <strong>Title:</strong> <span>{result.title}</span>
              </p>
              <p>
                <strong>Message:</strong> <span>{result.message}</span>
              </p>
              <p>
                <strong>Total Users:</strong>{" "}
                <span>{result.details.totalUsers}</span>
              </p>
              <p>
                <strong>Success Count:</strong>{" "}
                <span>{result.details.successCount}</span>
              </p>
              <p>
                <strong>Failure Count:</strong>{" "}
                <span>{result.details.failureCount}</span>
              </p>
            </div>
          </div>
        )}

        {/* Emoji Picker Dropdown */}
        {open && (
          <div className="emoji-picker" ref={emojiPickerRef}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      {/* Right Side - WhatsApp Preview */}
      <div className="template-preview">
        <span className="label">Template Preview</span>
        <div className="whatsapp-container">
          <div className="whatsapp-message">
            <p
              dangerouslySetInnerHTML={{
                __html: formattedMessage.replace(/\n/g, "<br />"),
              }}
            ></p>
            <span className="whatsapp-time">10:28 AM</span>
          </div>
          <div className="send-message-body" aria-label="Message">
            <span>
              <PacmanLoader size={15} loading={loading} color="green" />
              {loading && "Message"}
            </span>

            <span className="send-icon" onClick={(e) => handleSendMessage(e)}>
              <IoSend />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessageBody;
