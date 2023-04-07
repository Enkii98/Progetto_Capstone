package com.mattiacannizzaro.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

	@Query("SELECT u.username FROM User u WHERE u.username LIKE %:search%")
	List<String> findUsernamesContainingSearchString(@Param("search") String search);

}
