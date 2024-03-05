package com.lafhane.lafhaneserverjava.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Configuration
@EnableWebSocket
@EnableScheduling
public class WebSocketConfig implements WebSocketConfigurer {

    private final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new WebSocketHandler(), "/ws").setAllowedOrigins("*");
        //registry.addHandler(new WebSocketHandler2(), "/ws/remaining_time").setAllowedOrigins("*");
    }


    public class WebSocketHandler extends AbstractWebSocketHandler {

        @Override
        public void afterConnectionEstablished(WebSocketSession session) throws Exception {
            sessions.add(session);
        }

        @Override
        public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
            sessions.remove(session);
        }

        public void broadcastMessage(String message) {
            for (WebSocketSession session : sessions) {
                try {
                    session.sendMessage(new TextMessage(message));
                } catch (Exception e) {
                    // Handle exception, e.g., session is closed
                }
            }
        }


        public WebSocketHandler webSocketHandler() {
            return new WebSocketHandler();
        }
    }

    public class WebSocketHandler2 extends AbstractWebSocketHandler {

        @Override
        public void afterConnectionEstablished(WebSocketSession session) throws Exception {
            sessions.add(session);
        }

        @Override
        public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
            sessions.remove(session);
        }

        public void broadcastMessage(String message) {
            for (WebSocketSession session : sessions) {
                try {
                    session.sendMessage(new TextMessage(message));
                } catch (Exception e) {
                    // Handle exception, e.g., session is closed
                }
            }
        }

        @Bean
        public WebSocketHandler webSocketHandler() {
            return new WebSocketHandler();
        }
    }
}