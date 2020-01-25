package com.betha.apirest.controllers;

import java.util.List;
import java.util.Optional;
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
	private UserRepository user_repository;
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = user_repository.findAll();
		
		if(users.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		}
    }
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUser(@PathVariable(value = "id") long id){
        Optional<User> user = user_repository.findById(id);
        if(user.isPresent()) {
        	return new ResponseEntity<User>(user.get(), HttpStatus.OK);
        } else {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/user", method =  RequestMethod.POST)
    public ResponseEntity<User> saveUser(@Valid @RequestBody User user){
		List<User> users = user_repository.findAll();
		
		for(User user_list : users) {
			if(user_list.getCPF() != null) {
				if(user_list.getCPF().equals(user.getCPF())) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}
			if(user_list.getCNPJ() != null) {
				if(user_list.getCNPJ().equals(user.getCNPJ())) {
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}
			}
		}
		user_repository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
    }
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/user/{id}", method =  RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") long id, @Valid @RequestBody User new_user){
		
		List<User> users = user_repository.findAll();
		
		for(User user_list : users) {
			if(user_list.getId() != id) {
				if(user_list.getCPF() != null) {
					if(user_list.getCPF().equals(new_user.getCPF())) {
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
					}
				}
				if(user_list.getCNPJ() != null) {
					if(user_list.getCNPJ().equals(new_user.getCNPJ())) {
						return new ResponseEntity<>(HttpStatus.NOT_FOUND);
					}
				}
			}
		}
		
		Optional<User> old_user = user_repository.findById(id);
        if(old_user.isPresent()) {
            User user = old_user.get();
            
            user.setName(new_user.getName());
            user.setCPF(new_user.getCPF());
            user.setCNPJ(new_user.getCNPJ());
            user.setAddress(new_user.getAddress());
            user.setTelephone(new_user.getTelephone());
            
            user_repository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") long id){
        Optional<User> user = user_repository.findById(id);
        if(user.isPresent()) {
            user_repository.delete(user.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

