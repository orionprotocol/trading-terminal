package ru.dev4j.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;
import ru.dev4j.model.Pair;
import ru.dev4j.model.PairConfig;
import ru.dev4j.repository.db.PairConfigRepository;
import ru.dev4j.service.socket.custom.SocketHandler;
import ru.dev4j.service.SocketHolder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private PairConfigRepository pairConfigRepository;

    @Autowired
    public SocketHolder socketHolder;

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        Set<String> channels = new HashSet<>();

        List<PairConfig> configList = pairConfigRepository.findAll();
        for (PairConfig pairConfig : configList) {
            for (Pair pair : pairConfig.getPair()) {
                channels.add(pair.getGeneralName());
            }
        }

        for (String channel : channels) {
            SocketHandler socketHandler = new SocketHandler(channel);
            socketHolder.addSocket(channel, socketHandler);
            registry.addHandler(socketHandler, "/" + channel).setAllowedOrigins("*");

        }
    }
}
