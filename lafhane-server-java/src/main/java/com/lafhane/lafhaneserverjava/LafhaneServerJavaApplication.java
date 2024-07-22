package com.lafhane.lafhaneserverjava;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class LafhaneServerJavaApplication {
	public static void main(String[] args) {
		SpringApplication.run(LafhaneServerJavaApplication.class, args);
	}

//	@Bean
//	public WebMvcConfigurer configure() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry reg) {
//				reg.addMapping("/**").allowedOrigins("http://localhost:3000")
//				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//				.allowCredentials(true)
//				.allowedHeaders("*");
//			}
//		};
//	}

}
