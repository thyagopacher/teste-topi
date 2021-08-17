

const api = {
  dominio: 'https://www.themealdb.com/api/json/v1/1/',
  buscaDados(metodo, tipo) {
    $("#resultado").html('<div class="fa-3x"><i class="fas fa-spinner fa-spin"></i></div> ... Carregando');
    $.ajax({
      url: this.dominio + metodo,
      dataType: 'json',
      success: function (result) {
        console.log(result);
        if (tipo != "") {
          api.iterator(result, tipo);
        }
      }
    });
  },
  iterator(result, tipo) {
    let htmlLinha = '';
    let vetor = api.resultadoFinal(result, tipo);
    $.each(vetor, function (i, item) {
      console.log(item, i);
      let id = nome = imagem = imgSrc = descricao = '';
      if (tipo == "Category2") {
        tipo = "Category";
      }
      if (item[`id${tipo}`] != undefined) {
        id = item[`id${tipo}`];
      }
      if (item[`str${tipo}`] != undefined) {
        nome = item[`str${tipo}`];
      }
      if (item[`str${tipo}Thumb`] != undefined) {
        imagem = item[`str${tipo}Thumb`];
        imgSrc = `<img src="${imagem}" alt="Imagem Categoria ${nome}"/>`;
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
          <div class="panel-heading">${id} - ${nome}</div> 
          <div class="panel-body">${imgSrc}</div>
          <div class="panel-footer">${descricao}</div>
        </div> 
      </div>
      `;
    });
    $("#resultado").html(htmlLinha);
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
  listarCategoriasPrincipais() {
    this.buscaDados('categories.php', 'Category');
  },
  listarCategorias() {
    this.buscaDados('list.php?c=list', 'Category2');
  },
  listarAreas() {
    this.buscaDados('list.php?a=list', 'Area');
  },
  listarIngredientes() {
    this.buscaDados('list.php?i=list', 'Ingredient');
  },
  filtroPorNome(nome) {
    this.buscaDados(`search.php?s=${nome}`, 'Meal');
  },
  filtroPorPrimeiraLetra(letra) {
    this.buscaDados(`search.php?f=${letra}`, 'Meal');
  },
  filtroPorArea(area) {
    this.buscaDados(`filter.php?a=${area}`, 'Meal');
  },
  filtroPorCategoria(categoria) {
    this.buscaDados(`filter.php?c=${categoria}`, 'Meal');
  },
  filtroPorIngrediente(ingrediente) {
    this.buscaDados(`filter.php?i=${ingrediente}`, 'Meal');
  }
};