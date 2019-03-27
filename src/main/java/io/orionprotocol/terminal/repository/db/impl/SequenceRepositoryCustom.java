package io.orionprotocol.terminal.repository.db.impl;


/**
 * Created by kiv1n on 17-Aug-15.
 */
public interface SequenceRepositoryCustom {

    long getNextSequenceId(String key);

}
