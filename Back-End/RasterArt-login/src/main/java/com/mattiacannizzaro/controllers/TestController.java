package com.mattiacannizzaro.controllers;

import java.util.ArrayList;
import java.util.List;

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

			Photo _photo = photoRepository.save(Photo.builder().width(photo.getWidth()).height(photo.getHeight())
					.url(photo.getUrl()).liked(photo.getLiked()).alt(photo.getAlt()).title(photo.getTitle())
					.description(photo.getDescription()).nickname(photo.getNickname()).build());

			return new ResponseEntity<>(_photo, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/photos/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") long id) {
		try {
			photoRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/photos")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteAllTutorials() {
		try {
			photoRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

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

}
