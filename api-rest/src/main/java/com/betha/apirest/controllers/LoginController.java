package com.betha.apirest.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.betha.apirest.models.Login;
import com.betha.apirest.repository.LoginRepository;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class LoginController {

	@Autowired
	private LoginRepository login_repository;
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/login", method =  RequestMethod.POST)
    public ResponseEntity<Login> createLogin(@Valid @RequestBody Login user){
		List<Login> users = login_repository.findAll();
		
		for(Login user_list : users) {
			if(user_list.getUsername().equals(user.getUsername())) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}
		login_repository.save(user);
		
		return new ResponseEntity<Login>(user, HttpStatus.OK);
    }
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResponseEntity<Login> authenticationUser(@RequestParam("username") String username, @RequestParam("password") String password){
		List<Login> users = login_repository.findAll();
		
		for(Login user_list : users) {
			if(user_list.getUsername().equals(username)) {
				if(user_list.getPassword().equals(password)) {
					return new ResponseEntity<>(HttpStatus.OK);
				}
			}
		}
		return new ResponseEntity<Login>(HttpStatus.NOT_FOUND);
    }
}
