/**********************************************************************************************************************************************************************************************************
 * Objetivo do arquivo respomsavel por manipulação de dados entre o app e o model
 *           (validações, tratamento de dados, tratamento de erros)
 * data: 07/10/2025
 * autor : Davi de Almeida Santos
 * Versão 1.0
 ***********************************************************************************************************************************************************************************************************************/


const dataAtual = new Date()

//******************************************************************* MENSAGESN DE PADRONIZAÇÃO DO PROJETO ******************************************************************************************//
const HEADER     =  {
 
                                developament:   'Davi de Almeida',
                                api_description: 'API para manipular dados da locadoura de filmes',
                                version: '1.0.10.25',
                                request_date: dataAtual.toLocaleDateString() ,
                                status: Boolean,
                                status_code : Number,
                                response: {} 




}


/******************************************************************* MENSAGENS DE ERRO DO PROJETO  ***************************************************************************************************/
const ERROR_NOT_FOUND                    =     {status: false, status_code: 400, message: 'Não foram encontrados :/ '}
const ERROR_INTERNAL_SERVER_MODEL        =     {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a problemas na camada de MODELAGEM de dados :/'}
const ERROR_INTERNAL_SERVER_CONTROLER    =     {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a problemas na camada de CONTROLE de dados :/'}
const ERROR_REQUIRID_FILDS               =     {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a campos obrigatóris que não foram preenchidos corretamente, conforme o recomendado :/'}



/******************************************************************* MENSAGENS DE SUCESSO DO PROJETO  ***************************************************************************************************/
const SUCCESS_REQUEST  = {status: true,  status_code: 200, message: 'requisição bem sussedida  :)'}




module.exports = {
  HEADER,
  SUCCESS_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_INTERNAL_SERVER_MODEL,
  ERROR_INTERNAL_SERVER_CONTROLER,
  ERROR_REQUIRID_FILDS
}