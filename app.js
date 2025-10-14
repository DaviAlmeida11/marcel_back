  /**********************************************************************************************************************************************************************************************************
 * Objetivo do arquivo respomsavel por manipulação de dados entre o app e o model
 *           (validações, tratamento de dados, tratamento de erros)
 * data: 07/10/2025
 * autor : Davi de Almeida Santos
 * Versão 1.0
 ***********************************************************************************************************************************************************************************************************************/

  //request = os dados da requisição da API  response = envia os dados na API

const express   = require('express')
const cors      = require('cors')
const bodyParser = require('body-parser')


const PORT      = process.PORT || 8080  // process.PORT envia

//instancia na classe do express
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*') 
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors()) 
    next( )
})

const controlerFilms = require('./controler/filme/controle_filme')

// end poin para crud de filmes 
app.get('/v1/locadoura/filme', cors(), async function(request, response){
let filme = await controlerFilms.listarFilmes()

response.status(filme.status_code)
response.json(filme)
} )

app.get('/v1/locadoura/filme/:id', cors(), async function(request, response){
  let idFilme = request.params.id
  let filme = await controlerFilms.buscarFilmeId(idFilme)
  
  response.status(filme.status_code)
  response.json(filme)
  } )

app.listen(PORT, function(){
    console.log('API está rodadndo')
})
