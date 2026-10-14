package com.aula.AulaAPI;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.aula.AulaAPI.entidades.Produto;
import com.aula.AulaAPI.repositories.ProdutoRepository;

@SpringBootTest
@AutoConfigureMockMvc
class ProdutoControllerIntegrationTests {
    @Autowired MockMvc mvc;
    @Autowired ProdutoRepository repository;

    @BeforeEach
    void limpar() { repository.deleteAll(); }

    @Test
    void deveExecutarFluxoCrud() throws Exception {
        mvc.perform(post("/produtos").contentType(MediaType.APPLICATION_JSON)
                .content("{\"descricao\":\"Teclado\",\"preco\":149.90}"))
            .andExpect(status().isCreated()).andExpect(jsonPath("$.id").isNumber());
        Produto criado = repository.findAll().get(0);
        Long id = criado.getId();

        mvc.perform(get("/produtos"))
            .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));
        mvc.perform(get("/produtos/{id}", id))
            .andExpect(status().isOk()).andExpect(jsonPath("$.descricao").value("Teclado"));
        mvc.perform(put("/produtos/{id}", id).contentType(MediaType.APPLICATION_JSON)
                .content("{\"descricao\":\"Teclado mecânico\",\"preco\":199.90}"))
            .andExpect(status().isOk()).andExpect(jsonPath("$.descricao").value("Teclado mecânico"));
        mvc.perform(delete("/produtos/{id}", id)).andExpect(status().isNoContent());
        mvc.perform(get("/produtos/{id}", id)).andExpect(status().isNotFound());
    }

    @Test
    void deveRejeitarDadosInvalidosEIdsAusentes() throws Exception {
        mvc.perform(post("/produtos").contentType(MediaType.APPLICATION_JSON)
                .content("{\"descricao\":\" \",\"preco\":10}"))
            .andExpect(status().isBadRequest());
        mvc.perform(post("/produtos").contentType(MediaType.APPLICATION_JSON)
                .content("{\"descricao\":\"Mouse\",\"preco\":-1}"))
            .andExpect(status().isBadRequest());
        mvc.perform(get("/produtos/999999")).andExpect(status().isNotFound());
        mvc.perform(delete("/produtos/999999")).andExpect(status().isNotFound());
    }
}
