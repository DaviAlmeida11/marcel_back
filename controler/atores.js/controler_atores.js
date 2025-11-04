/******************************************************************************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de atoress 
* Data : 021/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
**************************************************************************************************************************************************************************************************************/

const atoresDAO = require('../../model/DAO/atores.js')
const { buscarFilmeId } = require('../filme/controle_filme.js')



const MESSAGE_DEFAULT = require('../modulo/config_message.js')


const listarAtores = async function () {

let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

try{
    let result = await atoresDAO.getSelecAllAtores()

    if (result){console.log(result)
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
            let result = await atoresDAO.getSelectAllByAtores(parseInt(id))
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
                return MESSAGE_INTERNAL_SERVER_MODEL
            }
        }else{
            return MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "atributo [id] invalido"
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER
    } 
    
}
const inserirAtores = async function (atores, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));
  
    try {
      if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // chama a função de validação dos dados de cadastro
        let validarDados = await validarDadosAtores(atores);
  
        if (!validarDados) {
          let result = await filmeDAO.setInsertFilms(atores);
  
          if (result) {
            let lastIdAtores = await atoresDAO.getSelecAllAtores()
  
            if (lastIdAtores) {
              atores.id = lastIdAtores;
              MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
              MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code;
              MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
              MESSAGE.HEADER.response = atores;
  
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


const atualizarAtores = async function (atores, id, contentType) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    
    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //chama a função de validação dos adados de cadastro
            let validarDados = await validarDadosAtores(atores)
            if (!validarDados) {

                let validarId = await (id)
                if (validarId.status_code == 200) {

                    atores.id = parseInt(id)



                    let result = await atoresDAO.setUpdateAtores(atores)
             
                    if (result) { 
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response = atores
                        return MESSAGE.HEADER
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500

                    }
                } else {
                    return validarId //retorno da função de buscar filme
                }

            } else {
                return validarDados
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }


    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER //500
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

    } else if (atores.nacionalidade == undefined) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [NACIONALIDADE] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (atores.data_nascimento == undefined || atores.data_nascimento.length != 10 || atores.data_nascimento == '') {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [DATA LANÇAMENTO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (atores.data_obito == '' || atores.data_obito == null || atores.data_obito == undefined || atores.data_obito.length > 50) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [DATA_OBITO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (atores.premiacoes == ''  || atores.premiacoes == undefined || atores.premiacoes.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo [PREMIAÇÔES] invalido"
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