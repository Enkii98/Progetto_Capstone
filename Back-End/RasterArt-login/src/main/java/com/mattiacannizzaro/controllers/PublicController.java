package com.mattiacannizzaro.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	// elimina da tutti i follower che seguono mio profilo
	@DeleteMapping("/deleteAllfollows")
	public ResponseEntity<String> deleteAllUserFollows(@RequestParam("username") String username) {
		String query = "DELETE FROM user_follows WHERE follows LIKE '%" + username + "%'";
		int deletedRows = jdbcTemplate.update(query);

		if (deletedRows > 0) {
			return new ResponseEntity<>("Deleted " + deletedRows + " rows.", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("No rows deleted.", HttpStatus.NOT_FOUND);
		}
	}

}
