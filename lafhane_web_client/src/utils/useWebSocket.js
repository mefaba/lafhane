import {useEffect, useRef, useState} from "react";

function useWebSocket(url, onMessage, onError) {
    const socketRef = useRef(null);
    useEffect(() => {
       
            socketRef.current = new WebSocket(url);
            socketRef.current.onopen = () => {
                console.log("WebSocket connection opened");
                socketRef.current.send("Hello, server!");
            };

            socketRef.current.onmessage = (event) => {
                //console.log('WebSocket message:', event.data);
                onMessage(event.data);
            };

            socketRef.current.onerror = (error) => {
                console.error("WebSocket error:", error);
                onError(error);
            };

            socketRef.current.onclose = () => {
                console.log("WebSocket closed");
            };
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log("WebSocket connection closed");
            }
        };
    }, []);

    return [socketRef.current];
}

export default useWebSocket;
