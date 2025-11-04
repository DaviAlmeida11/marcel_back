/**************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 01/10/2025
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
const getselectAllestudios = async function(){
    try{

  let sql = 'select * from tb_estudio order by id_estudio desc'

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


// Torna todos os IDs filmes do banco de dados 
const getSelectAllByIdEstudios = async function(id){
  try{

    let sql = `select * from tb_estudio where id_estudio = ${id}`
  
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
const getSelectLastIDEstudios = async function (id) {
  try{

    let sql = `select id from tb_estudio order by id_estudio desc limit 1`
  
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

// insere um estudio no banco de dados  
const setInsertEstudios = async function(estudio){
  try{
    let sql = `INSERT INTO tb_estudio (
    nome,
    pais_origem,
    ano_fundacao,
    data_encerramento,
    sede,
) VALUES( '${estudio.nome}',
          '${estudio.pais_origem}',
          '${estudio.ano_fundacao}',
          '${estudio.data_encerramento}',
          '${estudio.orcamento}',
          '${estudio.trailer}',
          '${estudio.capa}');`

   let  result = await prisma.$executeRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){
    return false 
  }

}
const setUpdateFilme = async function (estudio) {
  try{
    let sql = `update tb_estudio set
    nome                = '${estudio.nome}',
    pais_origem            = '${estudio.pais_origem}',
    ano_fundacao     = '${estudio.ano_fundacao}',
    data_encerramento  = '${estudio.data_encerramento}',
    sede  = '${estudio.sede}',
   where id = ${estudio.id}`

   let = result = await prisma.$executeRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){
    
    return false 
  }

    
}




module.exports = { 
    getselectAllestudios,
    getSelectAllByIdEstudios,
    getSelectLastIDEstudios,
    setInsertEstudios,
    setUpdateFilme


}