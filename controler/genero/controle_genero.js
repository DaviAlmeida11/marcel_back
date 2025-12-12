/******************************************************************************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 021/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
**************************************************************************************************************************************************************************************************************/

const generoDAO = require('../../model/DAO/genero.js')



const MESSAGE_DEFAULT = require('../modulo/config_message.js')


const listarGeneros = async function () {


  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    let result = await generoDAO.getselectAllGenerous()


    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.filmes = result


        return MESSAGE.HEADER
      } else {

        return MESSAGE.DEFAULT


      }
    } else {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
  }


}

const buscarGeneroId = async function (id) {

  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (id != '' || id != null || id != undefined || isNaN(id) || id > 0) {
      let result = await generoDAO.getSelectAllByIdGenerous(parseInt(id))
      if (result) { 
        if (result.length > 0) { 
          MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
          MESSAGE.HEADER.response.filmes = result
          return MESSAGE.HEADER
          
        } else {
         
          return MESSAGE.ERROR_NOT_FOUND
        }
      } else {
        return MESSAGE_INTERNAL_SERVER_MODEL
      }
    } else {
      return MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "atributo [id] invalido"

    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
  }
  
}

const inserirGenero = async function (genero, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
      // chama a função de validação dos dados de cadastro
      let validarDados = await validarDadosGenero(genero)

      if (!validarDados) {
        let result = await generoDAO.setInsertGenerous(genero)
       

        if (result) {
          let lastIdGenero = await generoDAO.getSelectLastIdGenerous()
        
          if (lastIdGenero) {
            genero.id = lastIdGenero;
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
            MESSAGE.HEADER.response = genero

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
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER;  // 500
  } 
}
  const atualizarGenero = async function (genero, id, contentType) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  
    try {
      if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
        let validarId = await buscarGeneroId(id)
  
        if (validarId.status_code == 200) {
  
          let validarDados = await validarDadosGenero(genero)
  
          if (!validarDados) {
            //Adicionando o ID no JSON com os dados do ator
            genero.id = parseInt(id)
  
            let result = await generoDAO.setUpdateGenero(genero)
  
            if (result) {
              MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
              MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
              MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
              MESSAGE.HEADER.response = genero
  
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
  

//esta dando errado arrumar depois
const excluirGenero = async function (id) {

  //criação da mensagem 
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 


  let validarId = await buscarGeneroId(id)
 

  if (validarId.status_code == 200) { 
    try {

      let result = await generoDAO.deletGenerous(id)
  
     


      if (result) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE.status_code
        MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE.message

        return MESSAGE.HEADER
      } else {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL   // 500
      }
    } catch (error) {  
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER  //500
    }
  } else {  
    return validarId
    
  }


}



const validarDadosGenero = async function (genero) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    if (genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 100) {
      MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [NOME] invalido"
      return MESSAGE.ERROR_REQUIRID_FILDS

  } else {
  }
}



module.exports = {
  listarGeneros,
  buscarGeneroId,
  inserirGenero,
  excluirGenero,
  atualizarGenero

}