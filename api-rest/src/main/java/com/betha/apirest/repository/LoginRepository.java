package com.betha.apirest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.betha.apirest.models.Login;

public interface LoginRepository extends JpaRepository<Login, Long>{

}
