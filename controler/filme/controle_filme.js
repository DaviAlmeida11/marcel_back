/**********************************************************************************************************************************************************************************************************
 * Objetivo do arquivo respomsavel por manipulação de dados entre o app e o model
 *           (validações, tratamento de dados, tratamento de erros)
 * data: 07/10/2025
 * autor : Davi de Almeida Santos
 * Versão 1.0
 ***********************************************************************************************************************************************************************************************************************/

//import do arquivo DAO para manipular o banco de dados

const filmeDAO = require('../../model/DAO/filme.js')





const DEFAULT = require('../../controler/modulo/config_message.js')



const listarFilmes = async function () {


    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT))

    try {
        let result = await filmeDAO.getselectAllFilms()
        console.log(result)

        if (result) {
            if (result.length > 0) {
                DEFAULT.HEADER.status = DEFAULT.SUCCESS_REQUEST.status
                DEFAULT.HEADER.status_code = DEFAULT.SUCCESS_REQUEST.status_code
                DEFAULT.HEADER.response.filmes = result


                return DEFAULT.HEADER
            } else {
                //está ENY arrumar depois 
                return DEFAULT.ERROR_NOT_FOUND


            }
        } else {
            return DEFAULT.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return DEFAULT.ERROR_INTERNAL_SERVER_CONTROLER
    }

}
const buscarFilmeId = async function (id) {
    let MENSAGE = JSON.parse(JSON.stringify(DEFAULT))

    try {
        if (id != '' || id != null || id != undefined || isNaN(id) || id > 0) {
                let result = await filmeDAO.getSelectAllByIdFilms(parseInt(id))
                if(result){
                    if(result.length > 0){
                    DEFAULT.HEADER.status = DEFAULT.SUCCESS_REQUEST.status
                    DEFAULT.HEADER.status_code = DEFAULT.SUCCESS_REQUEST.status_code
                     DEFAULT.HEADER.response.filmes = result

                     return DEFAULT.HEADER
                    }else{
                        //está ENY arrumar depois 
                        return DEFAULT.ERROR_NOT_FOUND
                    }
                } else {
                    return DEFAULT.ERROR_INTERNAL_SERVER_MODEL
                }
            }else{
                return DEFAULT.ERROR_REQUIRID_FILDS

            }
            } catch (error) {
                return DEFAULT.ERROR_INTERNAL_SERVER_CONTROLER
            }
        }
        
    
        
        
    
const inserirFilme = async function (filme) {

}

const atualizarFilme = async function (filme, id) {

}

const excluirFilme = async function (id) {

}
module.exports = {
    listarFilmes,
    buscarFilmeId
}