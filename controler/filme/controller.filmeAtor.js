/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc) para o CRUD de Filme e Genero
 * Data: 11/12/2025
 * Autor: Davi de Almeida
 * Versão: 2.0
 **********************************************************************************************/

const filmeAtorDAO = require('../../model/DAO/filmeAtor.js')


const MESSAGE_DEFAULT = require('../modulo/config_message.js')

const listarFilmeAtor = async function () {
 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
      
        let result = await filmeAtorDAO.getSelectAllFilmActor()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.total_film_Actor = result.length
                MESSAGE.HEADER.response.film_Actor = result

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


const listarFilmeAtorId = async function (id) {
    
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
  
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
       
            let result = await filmeAtorDAO.getSelectByIdFilmActor(id)

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film_Actor = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 404
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] invalido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Retorna os generos filtrando pelo ID do filme
const listarFilmeIdFilmeator = async function (filmeId) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatorio
        if (filmeId != '' && filmeId != null && filmeId != undefined && !isNaN(filmeId) && filmeId > 0) {
            //Chama a função para filtrar pelo ID
            let result = await filmeAtorDAO.getSelectFilmActorFIlmId(filmeId)

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film_Actor = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FILME_ID] invalido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Retorna os filmes filtrando pelo ID do genero
const listarAtorIdFilmeAtor = async function (atorId) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatorio
        if (atorId != '' && atorId != null && atorId != undefined && !isNaN(atorId) && atorId > 0) {
            //Chama a função para filtrar pelo ID
            let result = await filmeAtorDAO.getSelectFilmforActorId(atorId)

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film_Actor = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 404
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [GENERO_ID] invalido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const inserirFilmeAtor = async function (filmeAtor, contentType) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmeAtor(filmeAtor)

            if (!validarDados) {
                // Chama a função do DAO para inserir um novo filme
                let result = await filmeAtorDAO.setInsertFilmeActor(filmeAtor)

                if (result) {
                    //Chama a função para receber o ID gerado no BD
                    let lastIdfilmeAtor = await filmeAtorDAO.getSelectLastId()

                    if (lastIdfilmeAtor) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo BD
                        filmeAtor.id = lastIdfilmeAtor

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = filmeAtor

                        return MESSAGE.HEADER //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarDados //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
const atualizarFilmeAtor = async function (data, id, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validar = await validarDadosFilmeAtor(data);

      if (!validar) {
        let validarId = await listarFilmeAtorId(id);

        if (validarId.status_code == 200) {
          data.id = id;
          let result = await filmeAtorDAO.setUpdateFilmeActor(data);

          if (result) {
            MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status;
            MESSAGE.HEADER.status_code =
            MESSAGE.SUCCESS_CREATED_ITEM.status_code;
            MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message;
            MESSAGE.HEADER.response = data;

            return MESSAGE.HEADER;
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL;
          }
        } else {
          return validarId;
        }
      } else {
        return validar;
      }
    } else {
      return MESSAGE.ERROR_CONTENT_TYPE;
    }
  } catch (error) {
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};



const excluirFilmeAtorByFilmeId = async function (filmeId) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (filmeId != '' && filmeId != null && filmeId != undefined && !isNaN(filmeId) && filmeId > 0) {
            let result = await filmeAtorDAO.setDeleteFilmActorByFilm(filmeId)

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message
                delete MESSAGE.HEADER.response
    
                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FILME_ID] invalido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
        
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const excluirFilmeAtor = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarID = await listarFilmeAtorId(id)

        if (validarID.status_code == 200) {
            let result = await filmeAtorDAO.setDeleteFilmActor(id)

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message
                delete MESSAGE.HEADER.response

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return validarID //A resposta do ValidarId já especifica onde está o erro
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}


const validarDadosFilmeAtor = async function (filmeAtor) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filmeAtor.id_filme == '' || filmeAtor.id_filme == null || filmeAtor.id_filme == undefined || isNaN(filmeAtor.id_filme) || filmeAtor.id_filme <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FILME_ID] invalido`
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (filmeAtor.id_ator == '' || filmeAtor.id_ator == null || filmeAtor.id_ator == undefined || isNaN(filmeAtor.id_ator) || filmeAtor.id_ator <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [ATOR_ID] invalido`
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else {
        return false
    }

}



module.exports = {
    listarFilmeAtor,
     listarFilmeAtorId,
    listarFilmeIdFilmeator,
    listarAtorIdFilmeAtor,
    inserirFilmeAtor,
    atualizarFilmeAtor,
    excluirFilmeAtorByFilmeId,
    excluirFilmeAtor
}