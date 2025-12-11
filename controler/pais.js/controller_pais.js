/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 05/12/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const paisDAO = require('../../model/DAO/pais.js')


const MESSAGE_DEFAULT = require("../modulo/config_message.js")



const listarPais = async function () {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    //Chama a função do DAO para retornar a lista de diretores
    let result = await paisDAO.getSelectAllPais()

    if (result) { 
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.total_pais = result.length
        MESSAGE.HEADER.response.pais = result

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

const listarPaisId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await paisDAO.getSelectPaisById(id)

      if (result) {
        if (result.length > 0) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.pais
            MESSAGE.HEADER.response.pais = result
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


const inserirPais = async function (pais, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {

      // Validação do objeto pais
      let validacao = await validarDadospais(pais);

      if (!validacao) {

        // Passa pais para o DAO
        let result = await paisDAO.setinsertPais(pais);
        if (result) {
          let lastIdPais = await paisDAO.getSelectLastId();

          if (lastIdPais) {
            pais.id = lastIdPais;

            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = pais;

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


const atualizarPais = async function (pais, id, contentType) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validarId = await listarPaisId(id)

      if (validarId.status_code == 200) {

        let validarDados = await validarDadospais(pais)

        if (!validarDados) {
          //Adicionando o ID no JSON com os dados do ator
          pais.id = parseInt(id)

          let result = await paisDAO.setupdatepais(pais)

          if (result) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
            MESSAGE.HEADER.response = pais

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
  } catch (error) { console.log(error)
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}


const excluirPais = async function (id) {
  //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    let validarId = await listarPaisId (id)

    if (validarId.status_code == 200) {


      let result = await paisDAO.setDeletePais(id)

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


const validarDadospais = function (diario) {

  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  // NOME
  if (diario.nome == '' || diario.nome == null || diario.nome == undefined || diario.nome.length > 100) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [NOME] invalido`
    return MESSAGE.ERROR_REQUIRED_FIELDS //400

  }

  return false; // validação OK
}






module.exports = {
  listarPais ,
  listarPaisId ,
  inserirPais,
  atualizarPais,
  excluirPais
}