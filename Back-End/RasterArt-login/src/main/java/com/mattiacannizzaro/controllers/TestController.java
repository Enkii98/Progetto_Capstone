package com.mattiacannizzaro.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

import com.mattiacannizzaro.models.Photo;
import com.mattiacannizzaro.repository.PhotoRepository;
import com.mattiacannizzaro.repository.UserRepository;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

	@Autowired
	PhotoRepository photoRepository;

	@Autowired
	UserRepository userRepository;

	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}

//	@GetMapping("/photos/{id}")
//	public ResponseEntity<List<Photo>> getAllPhotosById(@PathVariable("id") Long id) {
//		try {
//			List<Photo> photos = new ArrayList<>();
//
//			photoRepository.findById(id).forEach(photos::add);
//
//			if (photos.isEmpty()) {
//				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//			}
//
//			return new ResponseEntity<>(photos, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

	@GetMapping("/users/{nick}/photos")
	public ResponseEntity<List<Photo>> getPhotosByNick(@PathVariable("nick") String nick) {
		try {
			List<Photo> photos = photoRepository.findByNickname(nick);

			if (photos.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<>(photos, HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/byNickname")
	public ResponseEntity<List<Photo>> getPhotosByNicknameIn(@RequestParam List<String> nicknameList) {
		List<Photo> photos = photoRepository.findByNicknameIn(nicknameList);
		if (photos.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(photos);
		}
	}

	@PostMapping("/photos")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Photo> addPhoto(@RequestBody Photo photo) {
		try {

			Photo _photo = photoRepository.save(Photo.builder().url(photo.getUrl()).alt(photo.getAlt())
					.description(photo.getDescription()).nickname(photo.getNickname()).build());

			return new ResponseEntity<>(_photo, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PatchMapping("/photo/{id}/description")
	public ResponseEntity<?> updatePhotoDescription(@PathVariable Long id, @RequestBody String description) {
		Optional<Photo> photoOptional = photoRepository.findById(id);
		if (!photoOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Photo photo = photoOptional.get();
		photo.setDescription(description);
		photoRepository.save(photo);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/photos/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deletePhoto(@PathVariable("id") Long id) {
		try {
			photoRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete/all-photos")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteAllUserPhoto(@RequestBody String username) {
		List<Photo> photosToDelete = photoRepository.findByNickname(username);
		photoRepository.deleteAll(photosToDelete);
		return ResponseEntity.noContent().build();

	}

	@GetMapping("/photos")
	public ResponseEntity<List<Photo>> getAllPhotos() {
		try {
			List<Photo> photos = new ArrayList<Photo>();

			photoRepository.findAll().forEach(photos::add);

			if (photos.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(photos, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	@GetMapping("/photos/{alt}")
//	public ResponseEntity<List<Photo>> findByAlt(@PathVariable("alt") String alt) {
//		try {
//			List<Photo> photos = photoRepository.findByAlt(alt);
//
//			if (photos.isEmpty()) {
//				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//			}
//			return new ResponseEntity<>(photos, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

	//////////////////////////////////////////////////////// LIKE//////////////////////////////////////////////////////
	@PostMapping("/{id}/like")
	public ResponseEntity<?> addLike(@PathVariable("id") Long id, @RequestBody String username) {
		Optional<Photo> photoOptional = photoRepository.findById(id);
		if (!photoOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Photo photo = photoOptional.get();
		Set<String> likes = photo.getLikes();
		likes.add(username);
		photo.setLikes(likes);
		photoRepository.save(photo);
		return ResponseEntity.ok().build();
	}

	@PostMapping("delete/{id}/like")
	public Photo removeLike(@PathVariable("id") Long userId, @RequestBody String username) {

		Photo photo = photoRepository.findById(userId).get();

		photo.getLikes().removeIf(likes -> likes.contains(username));

		photoRepository.save(photo);

		return photo;
	}
}
