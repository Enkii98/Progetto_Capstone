package com.mattiacannizzaro.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "photo")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Photo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String url;
	private String alt;
	private String description;
	private String nickname;

	@Builder.Default
	@ElementCollection
	private Set<String> likes = new HashSet<>();

}
