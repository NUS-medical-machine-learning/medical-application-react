import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = (...args) => {
  const { current: socket } = useRef(io(...args));
  console.log("socketIo called");
  useEffect(() => {
    return () => {
      console.log("socketIo closed");
      socket && socket.removeAllListeners();
      socket && socket.close();
    };
  }, [socket]);
  return [socket];
};

export default useSocket;
