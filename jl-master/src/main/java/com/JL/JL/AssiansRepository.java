package com.JL.JL;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface AssiansRepository extends MongoRepository<Assians,String> {
List<Assians> findByStudid(String studid);

@Query(value="{'assignmentid':?0, 'studid':?1}")
Assians findByAssignmentidStudid(String assiid, String studid);
}