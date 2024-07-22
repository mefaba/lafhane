import { useEffect } from 'react';

function useWebSocket(url, onMessage, onError) {
    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket connection opened');
            socket.send('Hello, server!');
        };

        socket.onmessage = event => {
            console.log('Received message from server: ', event.data);
            onMessage(event.data);
        };

        socket.onerror = error => {
            console.error('WebSocket error:', error);
            onError(error);
        };

        // Cleanup function
        return () => {
            socket.close();
            console.log('WebSocket connection closed');
        };
    }, [url, onMessage, onError]);
}

export default useWebSocket;