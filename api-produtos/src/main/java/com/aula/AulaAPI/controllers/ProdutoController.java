package com.aula.AulaAPI.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.aula.AulaAPI.entidades.Produto;
import com.aula.AulaAPI.repositories.ProdutoRepository;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(originPatterns = { "http://localhost:*", "http://127.0.0.1:*" })
public class ProdutoController {
    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Produto> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Produto detalhar(@PathVariable Long id) {
        return buscar(id);
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody Produto entrada) {
        validar(entrada);
        entrada.setId(null);
        Produto salvo = repository.save(entrada);
        return ResponseEntity.created(URI.create("/produtos/" + salvo.getId())).body(salvo);
    }

    @PutMapping("/{id}")
    public Produto atualizar(@PathVariable Long id, @RequestBody Produto entrada) {
        validar(entrada);
        Produto atual = buscar(id);
        atual.setDescricao(entrada.getDescricao().trim());
        atual.setPreco(entrada.getPreco());
        return repository.save(atual);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private Produto buscar(Long id) {
        return repository.findById(id).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado")
        );
    }

    private void validar(Produto produto) {
        if (produto.getDescricao() == null || produto.getDescricao().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A descrição é obrigatória");
        }
        if (!Double.isFinite(produto.getPreco()) || produto.getPreco() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O preço deve ser não negativo");
        }
        produto.setDescricao(produto.getDescricao().trim());
    }
}
