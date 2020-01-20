package com.betha.apirest.controllers;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.betha.apirest.models.User;
import com.betha.apirest.repository.UserRepository;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	// return list users
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userRepository.findAll();
		
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
	
	// return specific user
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUser(@PathVariable(value = "id") long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent())
            return new ResponseEntity<User>(user.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
	
	// save user
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/user", method =  RequestMethod.POST)
    public User saveUser(@Valid @RequestBody User user){
		List<User> listUsers = userRepository.findAll();
		int cont = 0;
		
		for(User newUser : listUsers) {
			if(newUser.getCPF() != null) {
				if(newUser.getCPF().equals(user.getCPF())) {
					cont++;
				}
			}
			if(newUser.getCNPJ() != null) {
				if(newUser.getCNPJ().equals(user.getCNPJ())) {
					cont++;
				}
			}
		}
		if(cont >= 1) {
			return user;
		} else {
			return userRepository.save(user);
		}
    }
	
	// update user
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/user/{id}", method =  RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") long id, @Valid @RequestBody User newUser){
		
		List<User> listUsers = userRepository.findAll();
		int cont = 0;
		
		for(User userList : listUsers) {
			if(userList.getId() != id) {
				if(userList.getCPF() != null) {
					if(userList.getCPF().equals(newUser.getCPF())) {
						cont++;
					}
				}
				if(userList.getCNPJ() != null) {
					if(userList.getCNPJ().equals(newUser.getCNPJ())) {
						cont++;
					}
				}
			}
		}
		
		if(cont >= 1) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			Optional<User> oldUser = userRepository.findById(id);
	        if(oldUser.isPresent()){
	            User user = oldUser.get();
	            
	            user.setName(newUser.getName());
	            user.setCPF(newUser.getCPF());
	            user.setCNPJ(newUser.getCNPJ());
	            user.setAddress(newUser.getAddress());
	            user.setTelephone(newUser.getTelephone());
	            
	            userRepository.save(user);
	            return new ResponseEntity<User>(user, HttpStatus.OK);
	        }
	        else {
	        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
		}
		
    }
	
	// delete user
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            userRepository.delete(user.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

