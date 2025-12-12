/******************************************************************************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de atoress 
* Data : 021/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
**************************************************************************************************************************************************************************************************************/

const atoresDAO = require('../../model/DAO/atores.js')




const MESSAGE_DEFAULT = require('../modulo/config_message.js')


const listarAtores = async function () {

let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

try{
    let result = await atoresDAO.getSelecAllAtores()

    if (result){
        if(result.length > 0){
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.atoress = result
            return MESSAGE.HEADER
        } else{
            return MESSAGE.DEFAULT
        }
    }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }
} catch (error){
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
}
    
}

const listarAtoresById = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try{
        if(id !=''  || id != null || id != undefined || isNaN(id) || id > 0 ){
            let result = await atoresDAO.getSelectAllByIdAtores(id)
            if(result){
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.atores = result

                    return MESSAGE.HEADER
                } else{
                    return MESSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "atributo [id] invalido"
        }
    } catch (error) { console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    } 
    
}
const inserirAtores = async function (atores, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {

    // Valida Content-Type
    if (String(contentType).toUpperCase() != 'APPLICATION/JSON') {
      return MESSAGE.ERROR_CONTENT_TYPE; // 415
    }

    // Validação dos dados
    let validarDados = await validarDadosAtores(atores);

    // Se der erro na validação → retornar erro 400
    if (validarDados) {
      return validarDados; 
    }

    // INSERT no banco
    let result = await atoresDAO.setInsertAtores(atores);

    if (!result) {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
    }

    // Busca o último ID criado
    let lastIdAtores = await atoresDAO.getSelectLastIDatores();

    if (!lastIdAtores) {
      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
    }

    // Monta resposta de sucesso
    atores.id = lastIdAtores;

    MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
    MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
    MESSAGE.HEADER.response = atores;

    return MESSAGE.HEADER;

  } catch (error) {
 
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
  }
}
 const atualizarAtores= async function (atores, id, contentType) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  
    try {
      if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
        let validarId = await listarAtoresById(id)
  
        if (validarId.status_code == 200) {
  
          let validarDados = await validarDadosAtores(atores)
  
          if (!validarDados) {
            //Adicionando o ID no JSON com os dados do ator
            atores.id = parseInt(id)
  
            let result = await atoresDAO.setUpdateAtores(atores)
  
            if (result) {
              MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
              MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
              MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
              MESSAGE.HEADER.response = atores
  
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
  

const excluirAtores = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    let validarId = await listarAtores(id)

    if (validarId.status_code == 200) {
        try {
            let result = await atoresDAO.deleteUpdateAtores(id)

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



const validarDadosAtores = async function (atores) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))



    if (atores.nome == '' || atores.nome == null || atores.nome == undefined || atores.nome.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [NOME] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (atores.data_nascimento == undefined || atores.data_nascimento.length != 10 || atores.data_nascimento == '') {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [DATA LANÇAMENTO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (atores.data_falecimento == '' || atores.data_falecimento == null || atores.data_falecimento == undefined ) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [DATA_OBITO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS


    } else if (atores.foto == undefined || atores.foto.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [FOTO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS


}
}



module.exports = {
    listarAtores,
    listarAtoresById,
    validarDadosAtores,
    inserirAtores,
    atualizarAtores,
    excluirAtores
}