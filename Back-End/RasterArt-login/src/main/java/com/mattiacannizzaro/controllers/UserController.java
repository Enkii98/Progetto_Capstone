package com.mattiacannizzaro.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mattiacannizzaro.models.Info;
import com.mattiacannizzaro.models.User;
import com.mattiacannizzaro.repository.InfoRepository;
import com.mattiacannizzaro.repository.PhotoRepository;
import com.mattiacannizzaro.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	PhotoRepository photoRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	InfoRepository infoRepository;

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public boolean adminAccess() {
		return true;
	}

	@GetMapping("/search/{user}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<String> searchUsers(@PathVariable("user") String search, @RequestParam String username) {
		List<String> usernames = userRepository.findUsernamesContainingSearchString(search);
		usernames.remove(username);
		return usernames;
	}

	@GetMapping("/{id}/follows")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
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

	@GetMapping("/usernames/list")
	public List<String> getAllUsernames() {
		List<User> userList = userRepository.findAll();
		List<String> usernameList = userList.stream().map(User::getUsername).collect(Collectors.toList());
		return usernameList;
	}

	@GetMapping("/emails/list")
	public List<String> getAllEmails() {
		List<User> userList = userRepository.findAll();
		List<String> emailList = userList.stream().map(User::getEmail).collect(Collectors.toList());
		return emailList;
	}

	@PostMapping("/{id}/add-string")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
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

	// elimina un profilo
	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
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

	@DeleteMapping("/deleteBy/{username}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> deleteUserByUsername(@PathVariable("username") String username) {
		Optional<User> user = userRepository.findByUsername(username);
		if (user.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		User users = user.get();
		users.getRoles().clear(); // rimuove tutti i ruoli dell'utente
		userRepository.delete(users);
		return ResponseEntity.ok().build();
	}

	// togli il follow che ho messo
	@PostMapping("/{id}/delete-follows")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public User deleteUserFollows(@PathVariable("id") Long userId, @RequestBody String username) {
		// recupera l'utente dal database
		User user = userRepository.findById(userId).get();

		// rimuovi tutti gli elementi dell'array che contengono la stringa specificata
		user.getFollows().removeIf(follow -> follow.contains(username));

		// salva l'utente aggiornato nel database
		userRepository.save(user);

		return user;
	}
////////////////////////////////////////////INFO///////////////////////////////////////////////

	@GetMapping("/info/username/{username}")
	public Optional<Info> getInfoByUsername(@PathVariable("username") String username) {
		return infoRepository.findByUsername(username);
	}

	@PostMapping("/info")
	public ResponseEntity<Info> createInfo(@RequestBody String username) {
		Info info = new Info();
		info.setUsername(username);
		infoRepository.save(info);
		return ResponseEntity.ok(info);
	}

	@PatchMapping("/info/{username}/profile-photo")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<String> updateProfilePhoto(@PathVariable("username") String username,
			@RequestBody String profilePhoto) {
		Optional<Info> infos = infoRepository.findByUsername(username);
		if (infos.isPresent()) {
			Info info = infos.get();
			info.setProfilePhoto(profilePhoto);
			infoRepository.save(info);
			return ResponseEntity.ok("Profile photo updated successfully.");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PatchMapping("/info/{username}/description")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Info> updateDescriptionProfile(@PathVariable("username") String username,
			@RequestBody String description) {
		Optional<Info> infos = infoRepository.findByUsername(username);
		if (infos.isPresent()) {
			Info info = infos.get();
			info.setDescription(description);
			Info updateInfo = infoRepository.save(info);
			return ResponseEntity.ok(updateInfo);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/delete/info/{username}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<String> deleteInfoByUsername(@PathVariable("username") String username) {
		Optional<Info> infoOptional = infoRepository.findByUsername(username);
		if (infoOptional.isPresent()) {
			Info info = infoOptional.get();
			infoRepository.delete(info);
			return ResponseEntity.ok("Info deleted successfully");
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/all/follows/info")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Info>> getAllFollowsInfoByUsernames(@RequestBody String[] usernames) {
		List<Info> profiles = new ArrayList<>();
		for (String username : usernames) {
			Optional<Info> info = infoRepository.findByUsername(username);
			info.ifPresent(profiles::add);
		}
		if (profiles.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(profiles);
	}
}
