import { to_Decrypt, to_Encrypt } from "../../utils/aes";
import { sendMessageAction } from "../../store/actions";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

//gets the data from the action object and reducers defined earlier
function Chat({ username, usernameAd, socket }) {
  const roomname = username && usernameAd && `${username}-${usernameAd}`;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt the message
      const ans = to_Decrypt(data.text, data.username);
      dispatch(
        sendMessageAction({ encrypt: false, msg: ans, cipher: data.text })
      );
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket, dispatch, messages]);

  const sendData = () => {
    if (text !== "") {
      //encrypt the message here
      const ans = to_Encrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, "mess");

  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
        </h2>
      </div>
      <div className="chat-message">
        {messages.map((i) => {
          if (i.username === username) {
            return (
              <div className="message">
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          } else {
            return (
              <div className="message mess-right">
                <p>{i.text} </p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
