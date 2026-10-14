package com.aula.AulaAPI;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.aula.AulaAPI.entidades.Produto;
import com.aula.AulaAPI.repositories.ProdutoRepository;

@Configuration
public class DadosIniciais {
    @Bean
    CommandLineRunner cadastrarExemplos(ProdutoRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                Produto teclado = new Produto();
                teclado.setDescricao("Teclado");
                teclado.setPreco(149.90);
                repository.save(teclado);

                Produto mouse = new Produto();
                mouse.setDescricao("Mouse");
                mouse.setPreco(79.90);
                repository.save(mouse);
            }
        };
    }
}
