package com.mattiacannizzaro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mattiacannizzaro.models.Photo;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

	List<Photo> findByAlt(String alt);

	List<Photo> findByNickname(String nickname);

	List<Photo> findByNicknameContainingIgnoreCase(String[] nickname);

	List<Photo> findByNicknameIn(List<String> nicknameList);

}
