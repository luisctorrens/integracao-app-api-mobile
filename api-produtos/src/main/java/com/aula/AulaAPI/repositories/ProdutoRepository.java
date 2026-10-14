package com.aula.AulaAPI.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aula.AulaAPI.entidades.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
