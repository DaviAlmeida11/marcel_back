/*********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model (Validações, tratamento de dados, tratamento de erros, etc) para o CRUD de Filme e Genero
 * Data: 11/12/2025
 * Autor: Davi de Almeida
 * Versão: 2.0
 **********************************************************************************************/

const filmeIdiomaDAO = require('../../model/DAO/filmeIdioma.js')


const MESSAGE_DEFAULT = require('../modulo/config_message.js')

const listarFilmeIdioma = async function () {
 
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
      
        let result = await filmeIdiomaDAO.getSelectAllFilmLEnguage()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.total_film_Lenguage = result.length
                MESSAGE.HEADER.response.film_Lenguage = result

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


const listarFilmeIdiomaId = async function (id) {
    
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
  
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
       
            let result = await filmeIdiomaDAO.getSelectByIdFilmLEnguage(id)

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film_Lenguage = result

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
const listarFilmeIdFilmeIdioma = async function (filmeId) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatorio
        if (filmeId != '' && filmeId != null && filmeId != undefined && !isNaN(filmeId) && filmeId > 0) {
            //Chama a função para filtrar pelo ID
            let result = await filmeIdiomaDAO.getSelectFilmLEnguageFilmId(filmeId)

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film_Lenguage = result

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
const listarAtorIdFilmeIdioma = async function (idiomaId) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatorio
        if (idiomaId != '' && idiomaId != null && idiomaId != undefined && !isNaN(idiomaId) && idiomaId > 0) {
            //Chama a função para filtrar pelo ID
            let result = await filmeAtorDAO.getSelectFilmforActorId(idiomaId)

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.film_Lenguage = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 404
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [IDIOMA_ID] invalido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const inserirFilmeIdioma = async function (filmeIdioma, contentType) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmeIdioma(filmeIdioma)

            if (!validarDados) {
                // Chama a função do DAO para inserir um novo filme
                let result = await filmeIdiomaDAO.setInsertFilmeIdioma(filmeIdioma)

                if (result) {
                    //Chama a função para receber o ID gerado no BD
                    let lastIdfilmeIdioma = await filmeIdiomaDAO.getSelectLastId()

                    if (lastIdfilmeIdioma) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo BD
                        filmeIdioma.id = lastIdfilmeIdioma

                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = filmeIdioma

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
const atualizarFilmeIdioma = async function (data, id, contentType) {
  let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

  try {
    if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
      let validar = await validarDadosFilmeIdioma(data);

      if (!validar) {
        let validarId = await listarFilmeIdiomaId(id);

        if (validarId.status_code == 200) {
          data.id = id;
          let result = await filmeIdiomaDAO.setUpdateFilmeIdioma(data);

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
  } catch (error) {  console.log(error)
    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};



const excluirFilmeIdiomaByFilmeId = async function (filmeId) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (filmeId != '' && filmeId != null && filmeId != undefined && !isNaN(filmeId) && filmeId > 0) {
            let result = await filmeIdiomaDAO.setDeleteFilmeIdiomaByFilm(filmeId)

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

const excluirFilmeIdioma = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarID = await listarFilmeIdiomaId(id)

        if (validarID.status_code == 200) {
            let result = await filmeIdiomaDAO.setDeleteFilmLenguage(id)

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


const validarDadosFilmeIdioma = async function (filmeIdioma) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filmeIdioma.id_filme == '' || filmeIdioma.id_filme == null || filmeIdioma.id_filme == undefined || isNaN(filmeIdioma.id_filme) || filmeIdioma.id_filme <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [FILME_ID] invalido`
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (filmeIdioma.id_idioma == '' || filmeIdioma.id_idioma == null || filmeIdioma.id_idioma == undefined || isNaN(filmeIdioma.id_idioma) || filmeIdioma.id_idioma <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = `Atributo [IDIOMS_ID] invalido`
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else {
        return false
    }

}



module.exports = {
  listarFilmeIdioma,
  listarFilmeIdiomaId,
  listarFilmeIdFilmeIdioma,
  inserirFilmeIdioma,
  atualizarFilmeIdioma,
  excluirFilmeIdiomaByFilmeId,
  excluirFilmeIdioma 

}