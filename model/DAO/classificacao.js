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





const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getselectAllclassificacao = async function(){
    try{

  let sql = 'select * from tbl_classificacao order by id_classificacao desc'

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
const getSelectClassificacaoById = async function (id) {
    try {
        let sql = `select * from tbl_classificacao where id_classificacao =${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}
const getSelectLastIDclassificacao = async function () {
  try{

    let sql = `select id_classificacao from tbl_classificacao order by id_classificacao desc limit 1`
  
let  result = await prisma.$queryRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){ 
    return false 
  }
}
// insere um estudio no banco de dados  
const setInsertclassificacao = async function(classificacao){
  try{
    let sql = `INSERT INTO tbl_classificacao (
    nome,
    idade
) VALUES (
    '${classificacao.nome}',
    '${classificacao.idade}'
);`

   let  result = await prisma.$executeRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){  console.log(error)
    return false 
  }

}
const setUpdateclassificacao = async function (classificacao) {
  try{
    let sql = `UPDATE tbl_classificacao SET
    nome = '${classificacao.nome}',
    idade = '${classificacao.idade}'
WHERE id_classificacao = ${classificacao.id};`

   let = result = await prisma.$executeRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){ 
    
    return false 
  }

    
}


const setDeleteClassificacao = async function (id) {
    try {
        let sql = `delete from tbl_classificacao where id_classificacao = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}



module.exports = { 
   getselectAllclassificacao,
  getSelectClassificacaoById,
   getSelectLastIDclassificacao,
   setInsertclassificacao,
   setUpdateclassificacao,
   setDeleteClassificacao

}