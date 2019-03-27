package io.orionprotocol.terminal.service;

import io.orionprotocol.terminal.service.socket.custom.SocketHandler;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SocketHolder {

    private Map<String, SocketHandler> socketHandlerHolder = new HashMap<>();

    public void addSocket(String name, SocketHandler socketHandler) {
        socketHandlerHolder.put(name, socketHandler);
    }

    public SocketHandler getSocket(String name) {
        return socketHandlerHolder.get(name);
    }
}
