package com.JL.JL;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubcodesRepository extends MongoRepository<Subcodes, String> {
	Subcodes findTopByOrderBySubcodeDesc();

	//void save(String subcode);
}
