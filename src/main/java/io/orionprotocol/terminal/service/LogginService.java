package io.orionprotocol.terminal.service;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;

@Service
public class LogginService {

    @PostConstruct
    public void init(){
        //TODO: Delete all loging from dependencies
        Logger root = (Logger) LoggerFactory.getLogger(Logger.ROOT_LOGGER_NAME);
        root.setLevel(Level.INFO);
    }
}
