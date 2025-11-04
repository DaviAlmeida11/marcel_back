/**************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 04/11/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
*/

/*****
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
 **********************************************************************/






//importa a biblioteca do prisma/client
const {PrismaClient} = require('../../generated/prisma')
 

//cria um objeto do prisma client para manipular
const prisma = new PrismaClient()


// Torna todos os filmes do banco de dados
const getselectAllDiretores = async function(){
    try{

  let sql = 'select * from tb_diretores order by id_diretor desc'

  let result = await prisma.$queryRawUnsafe(sql)
  

  // Validação para identificar se retornou uma arry (vazio ou com dados)
  if(Array.isArray(result))
    
    return result
else
  return 



}catch (error){

    return false
}



}

const getSelectAllByIdDiretores = async function (id) {

    try{
      let sql = `select * from tb_diretores where id_diretor=${id}`
  
      let result = await prisma.$queryRawUnsafe(sql)
  
      if(Array.isArray(result))
        return result
      else
      return false
  
    }catch (error){
      return false
    }
    
  }

  
const getSelectLastIDdiretores = async function (id) {
  try{

    let sql = `select id from tb_diretores order by id_diretor desc limit 1`
  
    let result = await prisma.$queryRawUnsafe(sql)
  
    // Validação para identificar se retornou uma arry (vazio ou com dados)
    if(Array.isArray(result))
      return Number(result[0].id)
  else
    return false
  
  }catch (error){
     // console.log(error)
      return false
  }
}

// insere um diretores no banco de dados  
const setInsertDiretores = async function(diretores){
  try{
    let sql = `UPDATE tb_diretores set
    nome = '${diretores.nome}',
    nacionalidade = '${diretores.nacionalidade}',
    data_nascimento = '${diretores.data_nascimento}',
    data_obito = '${diretores.data_obito}',
    premiacoes = '${diretores.premiacoes}',
    foto = '${diretores.foto}'
    where id = ${diretores.id}`


   let  result = await prisma.$executeRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){
    return false 
  }
}
const setUpdateDiretores = async function (diretores) {
    try {
      let sql = `UPDATE tb_diretores set
        nome = '${diretores.nome}',
        nacionalidade = '${diretores.nacionalidade}',
        data_nascimento = '${diretores.data_nascimento}',
        data_obito = '${diretores.data_obito}',
        premiacoes = '${diretores.premiacoes}',
        foto = '${diretores.foto}'
        where id_diretor = ${diretores.id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else
        return false
  
    } catch (error) {
     
      return false
    }
  }

  const deleteUpdateDiretores = async function (id) {
    try{
      let sql = `delete from tb_diretores where id_diretor = ${id} `
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if(result)
        return true 
      else
       return false
      }catch (error){
        
        return false 
      }
    
  
  
    }
  



module.exports = {
    getselectAllDiretores,
    getSelectAllByIdDiretores,
    getSelectLastIDdiretores,
    setInsertDiretores,
    setUpdateDiretores,
    deleteUpdateDiretores 
}



