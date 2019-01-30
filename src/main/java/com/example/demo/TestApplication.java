package com.example.demo;

import org.apache.camel.component.servlet.CamelHttpTransportServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages="com.example.demo.camel")
public class TestApplication {
	 
	@Bean
	ServletRegistrationBean servletRegistrationBean() {
	    ServletRegistrationBean servlet = new ServletRegistrationBean
	      (new CamelHttpTransportServlet(), "/camel"+"/*");
	    servlet.setName("CamelServlet");
	    return servlet;
	}
	public static void main(String[] args) {
		System.out.println("helloaaaaaaaaa");
		SpringApplication.run(TestApplication.class, args);

	}

}

