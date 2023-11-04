import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { useHistory, useParams } from "react-router-dom";
//importing firebase
import { storage, firebase } from "../firebase";
import db from "../firebase";
//importing components
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import ChatLandingScreen from "./ChatLandingScreen";
//importing material-ui
import CircularProgress from "@material-ui/core/CircularProgress";
//importing styles
import "react-toastify/dist/ReactToastify.css";
import "./Chat.css";

function Chat({ isRoomExist }) {
  // Initialize React hooks and context API
  const history = useHistory(); // React hook for accessing the history object of the react-router
  const [{ user }] = useStateValue(); // Destructure user from state context using useStateValue hook
  const { roomId } = useParams(); // Get the roomId parameter from the URL using useParams hook
  const [_roomId, set_RoomId] = useState(""); // State hook for managing the room ID
  const [roomName, setRoomName] = useState(""); // State hook for managing the room name
  const [roomCreatedBy, setRoomCreatedBy] = useState(""); // State hook for managing the creator of the room
  const [roomOwner, setRoomOwner] = useState(""); // State hook for managing the owner of the room
  const [messages, setMessages] = useState([]); // State hook for managing the messages in the chat room
  const [loading, setLoading] = useState(false); // State hook for managing the loading state
  const [showLandingScreenPhoto, setShowLandingScreenPhoto] = useState(false); // State hook for managing the visibility of the landing screen photo

  // useEffect hook to fetch room data and messages when roomId changes
  useEffect(() => {
    // Check if roomId exists
    if (roomId) {
      // Fetch room data from Firestore and update the state variables accordingly
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(function (doc) {
          setRoomName(doc.data()?.name);
          setRoomCreatedBy(doc.data()?.createdBy);
          setRoomOwner(doc.data()?.roomOwner);
          set_RoomId(doc.data()?.id);
        });

      // Fetch messages associated with the room from Firestore and update the state variable
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(function (doc) {
          setMessages(doc.docs.map((doc) => doc.data()));
          setLoading(true);
        });

      setShowLandingScreenPhoto(false); // Hide the landing screen photo
    } else {
      setShowLandingScreenPhoto(true); // Show the landing screen photo
      history.push("/"); // Redirect the user to the home page if no roomId is present
    }
  }, [roomId, history]); // useEffect dependencies: roomId and history

  return (
    <div className="chat">
      {roomId ? ( // Check if roomId exists
        <>
          <div>
            {/* Render ChatHeader component with relevant props */}
            <ChatHeader
              roomCreatedBy={roomCreatedBy}
              roomOwner={roomOwner}
              roomName={roomName}
              roomId={roomId}
              _roomId={_roomId}
              messages={messages}
              db={db}
              history={history}
              isRoomExist={isRoomExist}
            />
          </div>

          <div className="chat__body">
            {loading ? ( // Check if messages are loaded
              <ChatBody
                roomCreatedBy={roomCreatedBy}
                roomOwner={roomOwner}
                roomId={roomId}
                messages={messages}
                user={user}
                isRoomExist={isRoomExist}
              />
            ) : (
              // Show a loading spinner while messages are being loaded
              <div className="chat__body_loading">
                <div>
                  <CircularProgress />
                </div>
              </div>
            )}
          </div>

          <div>
            {/* Render ChatFooter component with relevant props */}
            <ChatFooter
              roomName={roomName}
              roomId={roomId}
              db={db}
              firebase={firebase}
              storage={storage}
            />
          </div>
        </>
      ) : (
        // Render ChatLandingScreen component if no roomId is present
        <ChatLandingScreen showLandingScreenPhoto={showLandingScreenPhoto} />
      )}
    </div>
  );
}

export default Chat; // Export the Chat component as the default export
