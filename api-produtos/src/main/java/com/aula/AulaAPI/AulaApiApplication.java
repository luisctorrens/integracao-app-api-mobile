package com.aula.AulaAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AulaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AulaApiApplication.class, args);
	}

}

/*
 * Controller -> chega a requisição http
 * service -> processa regra de negócio
 * repository -> acessa banco de dados
 * */
