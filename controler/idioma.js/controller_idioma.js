/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 05/12/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const idiomaDAO = require('../../model/DAO/idioma.js')


const MESSAGE_DEFAULT = require("../modulo/config_message.js")



const listaridioma = async function () {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    //Chama a função do DAO para retornar a lista de diretores
    let result = await idiomaDAO.getSelectAllIdioma()

    if (result) { 
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.total_idioma = result.length
        MESSAGE.HEADER.response.idioma = result

        return MESSAGE.HEADER //200
      } else {
        return MESSAGE.ERROR_NOT_FOUND //404
      }
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

const listaridiomaId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await idiomaDAO.getSelectidiomaById(id)

      if (result) {
        if (result.length > 0) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.idioma
            MESSAGE.HEADER.response.idioma = result
            return MESSAGE.HEADER

        } else {
          return MESSAGE.ERROR_NOT_FOUND //404
        }
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
      }
    } else {
      MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ID] invalido`
      return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}


const inseriridioma = async function (idioma, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

      // Validação do objeto idioma
      let validacao = await validarDadosidioma(idioma);

      if (!validacao) {

        // Passa idioma para o DAO
        let result = await idiomaDAO.setinsertidioma(idioma);
        if (result) {
          let lastIdidioma = await idiomaDAO.getSelectLastId();

          if (lastIdidioma) {
            idioma.id = lastIdidioma;

            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = idioma;

            return MESSAGE.HEADER;
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
          }
        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
        }
      } else {
        return validacao;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }

  } catch (error) { 

    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
}


const atualizaridioma = async function (idioma, id, contentType) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validarId = await listaridiomaId(id)

      if (validarId.status_code == 200) {

        let validarDados = await validarDadosidioma(idioma)

        if (!validarDados) {
          //Adicionando o ID no JSON com os dados do ator
          idioma.id = parseInt(id)

          let result = await idiomaDAO.setupdateidioma(idioma)

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


const excluiridioma = async function (id) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    let validarId = await listaridiomaId(id)

    if (validarId.status_code == 200) {


      let result = await idiomaDAO.setDeletePais(id)

      if (result) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code
        MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message

        return MESSAGE.HEADER //200
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
      }
    } else {
      return validarId
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}


const validarDadosidioma = function (diario) {

  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  // NOME
  if (diario.nome == '' || diario.nome == null || diario.nome == undefined || diario.nome.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

  }

  return false; // validação OK
}






module.exports = {
  listaridioma ,
listaridiomaId,
  inseriridioma,
  atualizaridioma,
  excluiridioma
}