/********************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 01/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
*/

/*************
 * dependencias do node para banco de dados relacionais 
 *      sequelaze = biblioteca para banco de dados(foi muito utilizado antigamente)
 *      Prisma = biblipteca atual para acesso e manipulação de dados utilizando SQL ou QRN  (mySQL, SQLServer, Oracle )
 *      knex = biblioteca atual para acesso e manipulação de dados SQL e mySQLServer
 * 
 * Banco não relacional
 *   mongoDb = uma das principais dependencias para banco de dados não relacionais 
 *
 * 
 * instalação do prisma = npm install prisma --save === realiza a conecçãp
 *                        npm isntall @prisma/cliente --save
 * 
 * SqueryRaulUnsafe() ===  Permite executar um script sql através de uma variavel 
 * 
 * 
 * $executeRaulUnsafe() === Permute executar um script sql que não retorna dados do BD ex:( INSERT, UPDATE, DELETE)
 * 
 * 
 * $queryRaw()  == permite execur scripts sql que retorna dados (select) executa um sceipt sql direto do metodo.Permite arcar tambem segurança para sql injection
 * 
 * 
 * 
 * $executeRaw() == permite execur scripts sql que retorna dados (select) executa um sceipt sql direto do metodo.Permite arcar tambem segurança para sql injection
 * 
 * npm install @prisma/client -- save
 * npx prisma init
 * npx prisma migrate dev
 ****************************************************************************************************************************************************************************************************************/






//importa a biblioteca do prisma/client
const {PrismaClient} = require('../../generated/prisma')
 

//cria um objeto do prisma client para manipular
const prisma = new PrismaClient()


// Torna todos os filmes do banco de dados
const getselectAllFilms = async function(){
    try{

  let sql = 'select * from tb_filme order by id desc'

  let result = await prisma.$queryRawUnsafe(sql)

  // Validação para identificar se retornou uma arry (vazio ou com dados)
  if(Array.isArray(result))
    return result
else
  return false

}catch (error){
   // console.log(error)
    return false
}

}


// Torna todos os IDs filmes do banco de dados 
const getSelectAllByIdFilms = async function(id){
  try{

    let sql = `select * from tb_filme where id=${id}`
  
    let result = await prisma.$queryRawUnsafe(sql)
  
    // Validação para identificar se retornou uma arry (vazio ou com dados)
    if(Array.isArray(result))
      return result
  else
    return false
  
  }catch (error){
     // console.log(error)
      return false
  }

}

// insere um filme no banco de dados  
const setInsertFilms = async function(filme){

}
//atualiza um filme existente do banco de dados filtrado por um  id
const setUpdateFilme = async function (filme) {
    
}

// deleta um filme existente no banco de dados por um id
const deleteUpdateFilme = async function (id) {
    
}


module.exports = { 
    getselectAllFilms,
    getSelectAllByIdFilms
}
