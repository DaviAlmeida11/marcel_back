/******************************************************************************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 021/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
**************************************************************************************************************************************************************************************************************/

const estudioDAO = require('../../model/DAO/estudio.js')



const MESSAGE_DEFAULT = require('../modulo/config_message.js')


const listarEstudios = async function () {


  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    let result = await estudioDAO.getselectAllestudios()


    if (result) {
      if (result.length > 0) {
        MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
        MESSAGE.HEADER.response.es = result


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

const buscarEstudioId = async function (id) {

  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (id != '' || id != null || id != undefined || isNaN(id) || id > 0) {
      let result = await estudioDAO.getSelectAllByIdEstudios(parseInt(id))
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
        return MESSAGE.INTERNAL_SERVER_MODEL
      }
    } else {
      return MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "atributo [id] invalido"

    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
  }
  
}

const inserirEstudio = async function (estudio, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

  try {
    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
      // chama a função de validação dos dados de cadastro
      let validarDados = await validarDadosEstudio(estudio)

      if (!validarDados) {
        let result = await estudioDAO.setInsertEstudios(estudio)
      

        if (result) {
          let lastIdEstudios = await estudioDAO.getSelectLastIDEstudios()
   
          if (lastIdEstudios) {
            estudio.id = lastIdEstudios;
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
            MESSAGE.HEADER.response = estudio

          return MESSAGE.HEADER // 200
            } else {
              return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
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




 const atualizarEstudio = async function (estudio, id, contentType) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  
    try {
      if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
        let validarId = await buscarEstudioId(id)
  
        if (validarId.status_code == 200) {
  
          let validarDados = await validarDadosEstudio(estudio)
  
          if (!validarDados) {
            //Adicionando o ID no JSON com os dados do ator
            estudio.id = parseInt(id)
  
            let result = await estudioDAO.setUpdateEstudio(estudio)
  
            if (result) {
              MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
              MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
              MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
              MESSAGE.HEADER.response = estudio
  
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
  

const excluirEstudio = async function (id) {

  //criação da mensagem 
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 


  let validarId = await buscarEstudioId(id)
 

  if (validarId.status_code == 200) { 
    try {

      let result = await estudioDAO.deleteUpdateEstudio(id)
  
     


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






const validarDadosEstudio = async function (estudio) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    if (estudio.nome == '' || estudio.nome == null || estudio.nome == undefined || estudio.nome.length > 100) {
      MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [NOME] invalido"
      return MESSAGE.ERROR_REQUIRID_FILDS

  } else {
  }
}



module.exports = {
  listarEstudios,
  buscarEstudioId,
  inserirEstudio,
  atualizarEstudio,
  excluirEstudio


}