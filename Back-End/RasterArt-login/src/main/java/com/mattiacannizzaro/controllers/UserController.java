package com.mattiacannizzaro.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mattiacannizzaro.models.User;
import com.mattiacannizzaro.repository.PhotoRepository;
import com.mattiacannizzaro.repository.RoleRepository;
import com.mattiacannizzaro.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	PhotoRepository photoRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@GetMapping("/user/id/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
		Optional<User> user = userRepository.findById(id);

		if (user.isPresent()) {
			return new ResponseEntity<>(user.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/user/username/{username}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<User> getUserByUsername(@PathVariable("username") String username) {
		Optional<User> user = userRepository.findByUsername(username);

		if (user.isPresent()) {
			return new ResponseEntity<>(user.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/{id}/follows")
	public Set<String> getFollowsByUserId(@PathVariable Long id) {
		Optional<User> user = userRepository.findById(id);
		if (user != null) {
			return user.get().getFollows();
		}
		return null;
	}

	@GetMapping("/user/list")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<User>> getAllUsers() {
		try {
			List<User> users = new ArrayList<User>();

			userRepository.findAll().forEach(users::add);

			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/{id}/add-string")
	public ResponseEntity<User> addFollow(@PathVariable Long id, @RequestBody String newString) {
		Optional<User> optionalEntity = userRepository.findById(id);

		if (!optionalEntity.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		User entity = optionalEntity.get();
		Set<String> currentArray = entity.getFollows();

		// Create a new set with the new string added
		Set<String> newArray = new HashSet<>(currentArray);
		newArray.add(newString);

		entity.setFollows(newArray);
		userRepository.save(entity);

		return ResponseEntity.ok(entity);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUserById(@PathVariable("id") Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			user.getRoles().clear(); // rimuove tutti i ruoli dell'utente
			userRepository.delete(user);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
