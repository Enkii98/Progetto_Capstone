package com.mattiacannizzaro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mattiacannizzaro.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	Optional<User> findById(Long id);

	Boolean existsByName(String name);

	Boolean existsBySurname(String surname);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	void save(Optional<User> user);

}
