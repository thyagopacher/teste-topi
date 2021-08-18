

const api = {
  dominio: '/',
  estaVazio(valor) {
    return valor === undefined || valor === null || valor === "";
  },
  buscaDados(metodo, tipo, eventoExtra) {
    $("#resultado").html('<div class="fa-3x"><i class="fas fa-spinner fa-spin"></i></div> ... Carregando');
    $.ajax({
      url: this.dominio + metodo,
      dataType: 'json',
      success: function (result) {
        if (!api.estaVazio(tipo)) {
          api.iterator(result, tipo, eventoExtra);
        }
      }
    });
  },
  iterator(result, tipo, eventoExtra) {
    let htmlLinha = '';
    let vetor = api.resultadoFinal(result, tipo);
    $.each(vetor, function (i, item) {
      let id = nome = nomeTxt = imagem = imgSrc = descricao = videoYoutube = '';
      if (tipo == "Category2") {
        tipo = "Category";
      }
      if (item[`id${tipo}`] != undefined) {
        id = item[`id${tipo}`];
      }
      if (item[`str${tipo}`] != undefined) {
        let nomeTxt = item[`str${tipo}`];
        if (tipo == "Category") {
          nome = `
            <a class='listaNomeCategoria text-white' title='Clique para filtrar da categoria: ${nomeTxt}' nome='${nomeTxt}'>${nomeTxt}</a>
          `;
        } else {
          nome = `
            <a class='listaItem text-white' title='Clique para filtrar o item: ${nomeTxt}' idItem='${id}' nome='${nomeTxt}'>${nomeTxt}</a>
          `;
        }
      }
      if (item[`str${tipo}Thumb`] != undefined) {
        imagem = item[`str${tipo}Thumb`];
        imgSrc = `<img src="${imagem}" alt="Imagem Categoria ${nomeTxt}"/>`;
      }
      if (item['strYoutube'] != undefined) {
        videoYoutube += `
        <a class="btn btn-default" target="_blank" href="${item['strYoutube']}">
          <i class="fab fa-youtube"></i>
          Video Youtube
        </a>`;
      }
      if (item[`str${tipo}Description`] != undefined && item[`str${tipo}Description`] != null && item[`str${tipo}Description`] != "") {
        descricao = item[`str${tipo}Description`];
      } else if (item['strDescription'] != undefined && item['strDescription'] != null && item['strDescription'] != "") {
        descricao = item['strDescription'];
      } else {
        if (item['strCategory'] != undefined && item['strCategory'] != null && item['strCategory'] != "") {
          descricao += `<br><strong>Categoria:</strong><br>${item['strCategory']}`;
        }
        if (item['strArea'] != undefined && item['strArea'] != null && item['strArea'] != "") {
          descricao += `<br><strong>Área:</strong><br>${item['strArea']}`;
        }
        if (item['strInstructions'] != undefined && item['strInstructions'] != null && item['strInstructions'] != "") {
          descricao += `<br><strong>Instruções:</strong><br>${item['strInstructions']}`;
        }
      }
      htmlLinha += `
      <div class="col-sm-4">
        <div class="panel panel-primary">
          <div class="panel-heading">ID: ${id} - Nome: ${nome}</div> 
          <div class="panel-body">
            ${imgSrc}<br>
            ${videoYoutube}
          </div>
          <div class="panel-footer">${descricao}</div>
        </div> 
      </div>
      `;
    });
    $("#resultado").html(htmlLinha);
    if (eventoExtra != undefined && eventoExtra != null) {
      eventoExtra();
    }
  },
  resultadoFinal(result, tipo) {
    if (tipo == "Category") {
      return result.categories;
    } else if (tipo == "Category2") {
      return result.meals;
    } else if (tipo == "Meal") {
      return result.meals;
    } else if (tipo == "Ingredient") {
      return result.meals;
    }
  },
  listarCategoriasPrincipais(eventoExtra) {
    this.buscaDados('categorias', 'Category', eventoExtra);
  },
  listarCategorias() {
    this.buscaDados('todas-categorias', 'Category2');
  },
  listarAreas() {
    this.buscaDados('areas', 'Area');
  },
  listarIngredientes() {
    this.buscaDados('ingredientes', 'Ingredient');
  },
  filtroPorId(id) {
    this.buscaDados(`filtro-por-id/${id}`, 'Meal');
  },
  filtroPorNome(nome) {
    this.buscaDados(`filtro-por-nome/${nome}`, 'Meal', eventosLinkItem);
  },
  filtroPorPrimeiraLetra(letra) {
    this.buscaDados(`filtro-por-primeira-letra/${letra}`, 'Meal', eventosLinkItem);
  },
  filtroPorArea(area) {
    this.buscaDados(`filtro-por-area/${area}`, 'Meal');
  },
  filtroPorCategoria(categoria) {
    this.buscaDados(`filtro-por-categoria/${categoria}`, 'Meal', eventosLinkItem);
  },
  filtroPorIngrediente(ingrediente) {
    this.buscaDados(`filtro-por-ingrediente/${ingrediente}`, 'Meal');
  }
};