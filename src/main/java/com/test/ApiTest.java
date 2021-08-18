package com.test;

import static org.junit.Assert.assertEquals;

import com.example.Api;

import org.junit.Test;

public class ApiTest {
  @Test
  public void validaURL() {
    Api api = new Api();
    boolean valida = api.urlValida("http://google.com.br");
    assertEquals(valida, true);
  }

  @Test
  public void ehNumero() {
    Api api = new Api();
    boolean valida = api.ehNumero("1");
    assertEquals(valida, false);
  }

}
