package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;

@RestController
public class TestController {
	
	@GetMapping("/test")
    public User sayHello(){
        System.out.println("==================> augular");
        User user = new User();
        user.setUsername("jackson");
        user.setPassword("123456");
        return user;
    }

}
