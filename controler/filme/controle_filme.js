/********************************************************************
 * Objetivo do arquivo respomsavel por manipulação de dados entre o app e o model
 *           (validações, tratamento de dados, tratamento de erros)
 * data: 07/10/2025
 * autor : Davi de Almeida Santos
 * Versão 1.0
 *************************************************************************/

//import do arquivo DAO para manipular o banco de dados

const filmeDAO = require('../../model/DAO/filme.js')





const MESSAGE_DEFAULT = require('../../controler/modulo/config_message.js')



const listarFilmes = async function () {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let result = await filmeDAO.getselectAllFilms()
       

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.filmes = result


                return MESSAGE.HEADER
            } else {
                //está ENY arrumar depois 
                return MESSAGE.DEFAULT
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    }

}
const buscarFilmeId = async function(id) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if(id != '' && id != null && id != undefined && !isNaN(id) && id > 0){
            let result = await filmeDAO.getSelectAllByIdFilms(id)

            if(result){
                if(result.length > 0){
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filme = result

                    return MESSAGE.HEADER //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ID] invalido`
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}




const inserirFilme = async function (filme, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));
  
    try {
      if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // chama a função de validação dos dados de cadastro
        let validarDados = await validarDadosFilme(filme);
  
        if (!validarDados) {
          let result = await filmeDAO.setInsertFilms(filme);
  
          if (result) {
            let lastIdFilme = await filmeDAO.getSelectLastID()
  
            if (lastIdFilme) {
              filme.id = lastIdFilme;
              MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
              MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
              MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
              MESSAGE.HEADER.response = filme;
  
              return MESSAGE.HEADER // 200
            } else {
              return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
          } else {
            return validarDados; // 400
          }
        } else {
          return validarDados; // 400 (caso a validação falhe)
        }
      } else {
        return MESSAGE.ERROR_CONTENT_TYPE; // 415 ou similar
      }
    } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER; // 500
    }
  }


const atualizarFilme = async function (idioma, id, contentType) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validarId = await buscarFilmeId(id)

      if (validarId.status_code == 200) {

        let validarDados = await validarDadosFilme(idioma)

        if (!validarDados) {
          //Adicionando o ID no JSON com os dados do ator
          idioma.id = parseInt(id)

          let result = await filmeDAO.setUpdateFilme(idioma)

          if (result) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
            MESSAGE.HEADER.response = idioma

            return MESSAGE.HEADER //200
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
          }

        } else {
          return validarDados
        }
      } else {
        return validarId
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE //415
    }
  } catch (error) { 
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}
const excluirFilme = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    let validarId = await buscarFilmeId(id)

    if (validarId.status_code == 200) {
        try {
            let result = await filmeDAO.deleteUpdateFilme(id)

            if (result) { 
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE.message

                return MESSAGE.HEADER
            } else {
                // Está EMPTY — arrumar depois
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } catch (error) { 
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
        }
    } else {
        return validarId
    }
}



const validarDadosFilme = async function (filme) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))



    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [NOME] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (filme.sinopse == undefined) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [SINOPSE] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10 || filme.data_lancamento == '') {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [DATA LANÇAMENTO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [DURAÇÃO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (filme.orcamneto == '' || filme.orcamento == null || filme.orcamento == undefined || filme.orcamento.length > 16 || typeof (filme.orcamento) == 'number') {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo [ORCAMENTO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (filme.trailer == undefined || filme.trailer.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [TRAILER] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 256) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [CAPA] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS
    } else {
    }
}


module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}