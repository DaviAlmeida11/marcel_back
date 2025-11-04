/********************************************************************
 * Objetivo do arquivo respomsavel por manipulação de dados entre o app e o model
 *           (validações, tratamento de dados, tratamento de erros)
 * data: 07/10/2025
 * autor : Davi de Almeida Santos
 * Versão 1.0
 *************************************************************************/

  //request = os dados da requisição da API  response = envia os dados na API

  const express   = require('express')
  const cors      = require('cors')
  const bodyParser = require('body-parser')
  
  //cria um objeto expecialista em JSON para receber coisas no body(POST E PUT)
  const bodyPareserJSON = bodyParser.json()
  
  
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

  const controlerGenero = require('./controler/genero/controle_genero')

  const controlerAtores = require('./controler/atores.js/controler_atores')

  const controlerDiretores = require('./controler/diretores/controler_diretores')

  const controlerEstudio = require('./controler/estudio/controler_estudio')
  
  // end poin para crud de filmes 
  app.get('/v1/locadoura/filme', cors(), async function(request, response){
  let filme = await controlerFilms.listarFilmes()
  
  response.status(filme.status_code)
  response.json(filme)
  } )
  //end poin que busca filme
  app.get('/v1/locadoura/filme/:id', cors(), async function(request, response){
    let idFilme = request.params.id
    let filme = await controlerFilms.buscarFilmeId(idFilme)
    
    response.status(filme.status_code)
    response.json(filme)
    } )
  
  
    //adiciona um filme 
    app.post('/v1/locadoura/filme', cors(), bodyPareserJSON, async function(request, response ){
      //recebe o objeto JSON pelo body da requisição
      let dadosBody = request.body
 
      
      let contentType = request.headers['content-type']
      
      let filme = await controlerFilms.inserirFilme(dadosBody, contentType)
     
    response.status(filme.status_code)
    response.json(filme)
    })
    //ATUALIZA UM FILME 
    app.put('/v1/locadoura/filme/:id', cors(), bodyPareserJSON, async function (request, response) {
      let dadosBody = request.body

      let idFilme = request.params.id

      let contentType = request.headers['content-type']

      let filme = await controlerFilms.atualizarFilme(dadosBody, idFilme, contentType)

      response.status(filme.status_code)
      response.json(filme)
    } )
    // deleta um filme 
    app.delete('/v1/locadoura/filme/:id', cors(), async function (request, response) {

      let idFilme = request.params.id

      let filme = await controlerFilms.excluirFilme(idFilme)
  

      response.status(filme.status_code)
      response.json(filme)
      
    })
    
      // end point do genero 

      // vertodos os generos
      app.get('/v1/filme/genero', cors(), async function(request, response){
        let genero = await controlerGenero.listarGeneros()
        
        response.status(genero.status_code)
        response.json(genero)
      })


      //buscar genero por id

      app.get('/v1/filme/genero/:id', cors(), async function(request, response){
        let idGenero = request.params.id
        let genero = await controlerGenero.buscarGeneroId(idGenero)
        
        response.status(genero.status_code)
        response.json(genero)
        } )
      

        // INSERIR GENERO
        app.post('/v1/filme/genero', cors(), bodyPareserJSON, async function(request, response ){
          //recebe o objeto JSON pelo body da requisição
          let dadosBody = request.body
     
          
          let contentType = request.headers['content-type']
          
          let genero = await controlerGenero.inserirGenero(dadosBody, contentType)
         
        response.status(genero.status_code)
        response.json(genero)
        })

         //ATUALIZA UM genero
    app.put('/v1/locadoura/genero/:id', cors(), bodyPareserJSON, async function (request, response) {
      let dadosBody = request.body

      let idGenero = request.params.id

      let contentType = request.headers['content-type']

      let genero = await controlerGenero.atualizarGenero(dadosBody, idGenero, contentType)

      response.status(genero.status_code)
      response.json(genero)
    } )

    
        // delete do filme
        app.delete('/v1/filme/genero/:id', cors(),  async function(request, response) {

          let idGenero = request.params.id
          
          let genero = await controlerGenero.excluirGenero(idGenero)
          
          response.status(genero.status_code)
          response.json(genero)


          
        })

            //andpoint atores 

            // vertodos os generos
      app.get('/v1/filme/generos', cors(), async function(request, response){
        let atores = await controlerAtores.listarAtores()

        response.status(atores.status_code) 
        response.json(atores)
      })
      
      //ver atores por id 
      app.get('/v1/filme/atores/:id', cors(), async function (request, response) {
        let atoresId = request.params.id

        let atores = await controlerAtores.listarAtoresById(atoresId)

        response.status(atores.status_code)
        response.json(atores)
        
      })

      //adicionar ator
      app.post('/v1/filme/atores', cors(), bodyPareserJSON, async function(request, response ){
        //recebe o objeto JSON pelo body da requisição
        let dadosBody = request.body
   
        
        let contentType = request.headers['content-type']
        
        let atores = await controlerAtores.listarAtores(dadosBody, contentType)
       
      response.status(atores.status_code)
      response.json(atores)
      })

      //preciso arrumar

      app.put('/v1/locadoura/atores/:id', cors(), bodyPareserJSON, async function (request, response) {
        let dadosBody = request.body
  
        let idAtores =request.params.id
  
        let contentType = request.headers['content-type']
  
        let atores = await controlerAtores.atualizarAtores(dadosBody, idAtores, contentType)
  
        response.status(atores.status_code)
        response.json(atores)
      } )
      app.delete('/v1/filme/atores/:id', cors(),  async function(request, response) {

        let idAtores = request.params.id
        
        let atores = await controlerAtores.excluirAtores(idAtores)
        
        response.status(atores.status_code)
        response.json(atores)


        
      })


      // end-point atores

      // ver todos os atores
      app.get('/v1/filme/diretores', cors(), async function(request, response){
        let diretores = await controlerAtores.listarAtores()

        response.status(diretores.status_code) 
        response.json(diretores)
      })

      // procurar diretor por id
      app.get('/v1/filme/diretores/:id', cors(), async function (request, response) {
        let diretoresId = request.params.id

        let diretores = await controlerDiretores.buscarDiretorID(diretoresId)

        response.status(diretores.status_code)
        response.json(diretores)
        
      })

      //adicionar ator
      app.post('/v1/filme/diretores', cors(), bodyPareserJSON, async function(request, response ){
        //recebe o objeto JSON pelo body da requisição
        let dadosBody = request.body
   
        
        let contentType = request.headers['content-type']
        
        let diretores = await controlerAtores.inserirAtores(dadosBody, contentType)
       console.log(diretores)
      response.status(diretores.status_code)
      response.json(diretores)
      })
      
      app.put('/v1/filme/diretores/:id', cors(), bodyPareserJSON, async function (request, response) {
        let dadosBody = request.body
  
        let idDiretor = request.params.id
  
        let contentType = request.headers['content-type']
  
        let diretor = await controlerDiretores.atualizarDiretores(dadosBody, idDiretor, contentType)
  
        response.status(diretor.status_code)
        response.json(diretor)
      } )
      app.delete('/v1/filme/diretores/:id', cors(),  async function(request, response) {

        let idDiretores = request.params.id
        
        let diretores = await controlerDiretores.excluirDiretor(idDiretores)
        
        response.status(diretores.status_code)
        response.json(diretores)


        
      })
// tabela estudios
      app.get('/v1/filme/estudios', cors(), async function(request, response){
        let estudios = await controlerEstudio.listarEstudios()

        response.status(estudios.status_code) 
        response.json(estudios)
      })

// ver por id
      app.get('/v1/filme/estudios/:id', cors(), async function (request, response) {
        let estudioId = request.params.id

        let estudios = await controlerEstudio.buscarEstudioId(estudioId)

        response.status(estudios.status_code)
        response.json(estudios)
        
      })

      app.post('/v1/filme/estudios', cors(), bodyPareserJSON, async function(request, response ){
        //recebe o objeto JSON pelo body da requisição
        let dadosBody = request.body
   
        
        let contentType = request.headers['content-type']
        
        let estudio = await controlerEstudio.inserirEstudio(dadosBody, contentType)
       
      response.status(estudio.status_code)
      response.json(estudio)
      })
  
  app.listen(PORT, function(){
      console.log('API está rodadndo')

  })


  