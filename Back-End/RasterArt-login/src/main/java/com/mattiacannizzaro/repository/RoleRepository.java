package com.mattiacannizzaro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mattiacannizzaro.models.Role;
import com.mattiacannizzaro.models.RoleType;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(RoleType name);

	void deleteById(Integer id);

}
