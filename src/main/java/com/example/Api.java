package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

@RestController
public class Api {

  private String apiHost = "https://www.themealdb.com/api/json/v1/1/";

  /**
   * urlValida Validação básica para URLs
   * 
   * @param String url
   * @return se a url é valida
   */
  public boolean urlValida(String url) {
    return url.contains("http");
  }

  public boolean ehNumero(String valor) {
    return !valor.contains("^[a-Z]");
  }

  @GetMapping("/categorias")
  public String listaCategorias() {
    String url = this.apiHost + "categories.php";
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }

  @GetMapping("/todas-categorias")
  public String listaTodasCategorias() {
    String url = this.apiHost + "list.php?c=list";
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }

  @GetMapping("/areas")
  public String listaAreas() {
    String url = this.apiHost + "list.php?a=list";
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }

  @GetMapping("/ingredientes")
  public String listaIngredientes() {
    String url = this.apiHost + "list.php?i=list";
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }

  @GetMapping("/filtro-por-id/{id}")
  public String filtroPorId(@PathVariable String id) {
    if (this.ehNumero(id)) {
      String url = this.apiHost + "lookup.php?i=" + id;
      ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
      return response.getBody();
    } else {
      return "erro";
    }
  }

  @GetMapping("/filtro-por-nome/{nome}")
  public String filtroPorNome(@PathVariable String nome) {
    String url = this.apiHost + "search.php?s=" + nome;
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }

  @GetMapping("/filtro-por-primeira-letra/{letra}")
  public String filtroPorPrimeiraLetra(@PathVariable String letra) {
    String url = this.apiHost + "search.php?f=" + letra;
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }

  @GetMapping("/filtro-por-area/{area}")
  public String filtroPorArea(@PathVariable String area) {
    String url = this.apiHost + "filter.php?a=" + area;
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }

  @GetMapping("/filtro-por-categoria/{categoria}")
  public String filtroPorCategoria(@PathVariable String categoria) {
    String url = this.apiHost + "filter.php?c=" + categoria;
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }

  @GetMapping("/filtro-por-ingrediente/{ingrediente}")
  public String filtroPorIngrediente(@PathVariable String ingrediente) {
    String url = this.apiHost + "filter.php?i=" + ingrediente;
    ResponseEntity<String> response = new RestTemplate().getForEntity(url, String.class);
    return response.getBody();
  }
}
