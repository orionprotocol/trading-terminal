package io.orionprotocol.terminal.repository.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

public abstract class AbstractRepository<T> {

	@Autowired
	protected MongoTemplate mongoTemplate;

	public void save(T entity) {
		mongoTemplate.save(entity);
	}
}
