$(function () {
  $("#listarCategorias").click(function () {
    api.listarCategoriasPrincipais(eventosLinkCategoria);
  });

  $("#btProcurarNome").click(function () {
    api.filtroPorNome($("#buscarDados").val());
  });

  $("#mostrarTestesUnitarios").click(function () {
    if ($("#qunit").hasClass('hide')) {
      $("#qunit, #qunit-fixture").removeClass('hide');
      $("#mostrarTestesUnitarios").html('Esconder Testes Unitários');
    } else {
      $("#qunit, #qunit-fixture").addClass('hide');
      $("#mostrarTestesUnitarios").html('Mostrar Testes Unitários');
    }
  });

  carregaAlfabeto();
});

function eventosLinkCategoria() {
  $(".listaNomeCategoria")
    .off('click')
    .on('click', function () {
      let nomeCategoria = $(this).attr('nome');
      api.filtroPorCategoria(nomeCategoria);
    });
}

function eventosLinkItem() {
  $(".listaItem")
    .off('click')
    .on('click', function () {
      let idItem = $(this).attr('idItem');
      api.filtroPorId(idItem);
    });
}

/**
 * faz uma paginação básica com alfabeto
 */
function carregaAlfabeto() {
  let htmlLista = '';
  for (i = 9, alphabet = ''; ++i < 36;) {
    let letraLocal = i.toString(36);
    htmlLista += `
      <button class="botaoAlfabetoListagem" letra="${letraLocal}" title="Lista começando em ${letraLocal}">${letraLocal}</button>
    `;
  }
  $("#botoesAlfabeto").html(htmlLista);
  $(".botaoAlfabetoListagem").click(function () {
    let letra = $(this).attr('letra');
    api.filtroPorPrimeiraLetra(letra);
  });
}