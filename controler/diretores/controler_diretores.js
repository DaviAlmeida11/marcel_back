/********************************************************************
 * Objetivo do arquivo respomsavel por manipulação de dados entre o app e o model
 *           (validações, tratamento de dados, tratamento de erros)
 * data: 07/10/2025
 * autor : Davi de Almeida Santos
 * Versão 1.0
 *************************************************************************/

//import do arquivo DAO para manipular o banco de dados

const diretoresDAO = require('../../model/DAO/diretores.js')





const MESSAGE_DEFAULT = require('../../controler/modulo/config_message.js')



const listarDiretores = async function () {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let result = await diretoresDAO.getselectAllDiretores()
       

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.diretores = result


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

const buscarDiretorID = async function (id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (id != '' || id != null || id != undefined || isNaN(id) || id > 0) {
            let result = await diretoresDAO.getSelectAllByIdDiretores(parseInt(id))
            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.diretores = result

                    return MESSAGE.HEADER
                } else {
                    //está ENY arrumar depois 
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
const inserirDiretores = async function (diretores, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
  
    try {
      if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Chama a função de validação dos dados de cadastro
        let validarDados = await validarDadosDiretores(diretores)
  
        // Se a validação falhar
        if (!validarDados) {
          // Insere o diretor no banco de dados
          let result = await diretoresDAO.setInsertDiretores(diretores)
  
          if (result) {
            // Busca o último ID inserido
            let lastIdDiretor = await diretoresDAO.getSelectLastIdDiretores()
  
            if (lastIdDiretor) {
              diretores.id = lastIdDiretor
  
              MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
              MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
              MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
              MESSAGE.HEADER.response = diretores
  
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
      console.error(error)
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
  }
  const atualizarDiretores = async function (diretores, id, contentType) {
  
  
      let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
      
      try {
  
          if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
              //chama a função de validação dos adados de cadastro
              let validarDados = await validarDadosDiretores(diretores)
              if (!validarDados) {
  
                  let validarId = await buscarDiretorID(id)
                  if (validarId.status_code == 200) {
  
                      diretores.id = parseInt(id)
  
  
  
                      let result = await diretoresDAO.setUpdateDiretores(diretores)
               
                      if (result) { 
                          MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATE_ITEM.status
                          MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATE_ITEM.status_code
                          MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATE_ITEM.message
                          MESSAGE.HEADER.response = diretores
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

const excluirDiretor = async function (id) {

  //criação da mensagem 
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 


  let validarId = await buscarDiretorID(id)
 

  if (validarId.status_code == 200) { 
    try {

      let result = await diretoresDAO.deleteUpdateDiretores(id)
  
     


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



  
const validarDadosDiretores = async function (diretores) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))



    if (diretores.nome == '' || diretores.nome == null || diretores.nome == undefined || diretores.nome.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [NOME] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (diretores.nacionalidade == undefined) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [NACIONALIDADE] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (diretores.data_nascimento == undefined || diretores.data_nascimento.length != 10 || diretores.data_nascimento == '') {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [DATA LANÇAMENTO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (diretores.data_obito == '' || diretores.data_obito == null || diretores.data_obito == undefined || diretores.data_obito.length > 50) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [DATA_OBITO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (diretores.premiacoes == ''  || diretores.premiacoes == undefined || diretores.premiacoes.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo [PREMIAÇÔES] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS

    } else if (diretores.foto == undefined || diretores.foto.length > 100) {
        MESSAGE.ERROR_REQUIRID_FILDS.invalid_field = "Atributo  [FOTO] invalido"
        return MESSAGE.ERROR_REQUIRID_FILDS


}
}



module.exports = {
    listarDiretores,
    buscarDiretorID,
    validarDadosDiretores,
    inserirDiretores,
    atualizarDiretores,
    excluirDiretor
    
   
}