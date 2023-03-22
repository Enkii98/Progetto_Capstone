package com.mattiacannizzaro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mattiacannizzaro.models.Info;

@Repository
public interface InfoRepository extends JpaRepository<Info, Long> {

	Optional<Info> findByUsername(String username);

}
