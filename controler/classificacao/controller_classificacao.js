/********************************************************************
 * Objetivo do arquivo respomsavel por manipulação de dados entre o app e o model
 *           (validações, tratamento de dados, tratamento de erros)
 * data: 07/10/2025
 * autor : Davi de Almeida Santos
 * Versão 1.0
 *************************************************************************/

//import do arquivo DAO para manipular o banco de dados

const classificacaoDAO = require('../../model/DAO/classificacao.js')





const MESSAGE_DEFAULT = require('../../controler/modulo/config_message.js')





const listarclassificacao = async function () {

  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {

    let result = await classificacaoDAO.getselectAllclassificacao()

    if (result) {

      if (result.length > 0) {

        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.classificacao = result

        return MESSAGE.HEADER

      } else {

        // usa o DEFAULT corretamente
        return MESSAGE.ERROR_CONTENT_TYPE
      }

    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }

  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
  }

}
const listarClassificacaoId = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  try {
    if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
      let result = await classificacaoDAO.getSelectClassificacaoById(id)

      if (result) {
        if (result.length > 0) {
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
          MESSAGE.HEADER.response.classificacao = result

          return MESSAGE.HEADER //200
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

const inserirclassificacao = async function (classificacao, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  
    try {
      if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Chama a função de validação dos dados de cadastro
        let validarDados = await validarDadosclassificacao(classificacao)
  
        // Se a validação falhar
        if (!validarDados) {
          // Insere o diretor no banco de dados
          let result = await classificacaoDAO.setInsertclassificacao(classificacao)
  
          if (result) {
            // Busca o último ID inserido
            let lastIdclassificacao = await classificacaoDAO.getSelectLastIDclassificacao()
  
            if (lastIdclassificacao) {
              classificacao.id = lastIdclassificacao
  
              MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
              MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
              MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
              MESSAGE.HEADER.response = classificacao
  
              return MESSAGE.HEADER // 200
            } else {
              return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
          }
        } else {
          return validarDados // 400 (caso a validação falhe)
        }
      } else {
        return MESSAGE.ERROR_CONTENT_TYPE // 415
      }
    } catch (error) {
      
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
  }
  const atualizarclassificacao = async function (classificacao, id, contentType) {
  
  
      let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
      
      try {
  
          if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
              //chama a função de validação dos adados de cadastro
              let validarDados = await validarDadosclassificacao(classificacao)
              if (!validarDados) {
  
                  let validarId = await buscarclassificacaoID(id)
                  if (validarId.status_code == 200) {
  
                      classificacao.id = parseInt(id)
  
  
  
                      let result = await classificacaoDAO.setUpdateclassificacao(classificacao)
                 if (result) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
            MESSAGE.HEADER.response = classificacao

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



const excluirClassificacao = async function (id) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
      let validarId = await listarClassificacaoId(id)
     

      if(validarId.status_code == 200){
          let result = await classificacaoDAO.setDeleteClassificacao(id)

          if(result){
              MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status
              MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code
              MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message

              return MESSAGE.HEADER //200
          }else{
              return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
          }
      }else{
          return validarId
      }
  } catch (error) {
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

  
const validarDadosclassificacao= async function (pais) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))



    if (pais.nome == '' || pais.nome == null || pais.nome == undefined || pais.nome.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [NOME] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

}
}



module.exports = {
   listarclassificacao,
   listarClassificacaoId,
   inserirclassificacao,
    atualizarclassificacao,
   excluirClassificacao
    
   
}