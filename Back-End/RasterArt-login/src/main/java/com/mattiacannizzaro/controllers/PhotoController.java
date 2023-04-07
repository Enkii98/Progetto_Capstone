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

@RestController
@RequestMapping("/api/img")
public class PhotoController {

	@Autowired
	PhotoRepository photoRepository;

	@Autowired
	UserRepository userRepository;

	// ottenere lista di photo di uno specifico utente
	@GetMapping("/users/{nick}/photos")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
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
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Photo>> getPhotosByNicknameIn(@RequestParam List<String> nicknameList) {
		List<Photo> photos = photoRepository.findByNicknameIn(nicknameList);
		if (photos.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(photos);
		}
	}

	// aggiungere una foto
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

	// aggiornare descrizione foto
	@PatchMapping("/photo/{id}/description")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
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

	// eliminare foto specifica
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

	// elimina tutte le foto del user
	@DeleteMapping("/delete/all-photos")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<HttpStatus> deleteAllUserPhoto(@RequestBody String username) {
		List<Photo> photosToDelete = photoRepository.findByNickname(username);
		photoRepository.deleteAll(photosToDelete);
		return ResponseEntity.noContent().build();

	}

	// tutte le foto
	@GetMapping("/photos")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
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

	// aggiornare descrzione foto di un utente
	@PatchMapping("/photo/patch/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Photo> updatePhotoDescription(@PathVariable("id") Long id, @RequestBody String description,
			@RequestParam String nickname) {
		Optional<Photo> photoOptional = photoRepository.findById(id);
		if (photoOptional.isPresent()) {
			Photo photo = photoOptional.get();
			if (photo.getNickname().equals(nickname)) {
				photo.setDescription(description);
				Photo updatedPhoto = photoRepository.save(photo);
				return ResponseEntity.ok(updatedPhoto);
			} else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	//////////////////////////////////////////////////////// LIKE//////////////////////////////////////////////////////

	@GetMapping("/likes/{likes}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Photo> getPhotosByLikes(@PathVariable("likes") String likes) {
		return photoRepository.findByLikesContaining(likes);
	}

	@PostMapping("/{id}/like")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
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
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public Photo removeLike(@PathVariable("id") Long userId, @RequestBody String username) {

		Photo photo = photoRepository.findById(userId).get();

		photo.getLikes().removeIf(likes -> likes.contains(username));

		photoRepository.save(photo);

		return photo;
	}
}
