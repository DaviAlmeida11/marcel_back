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






const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
      let sql = `select * from tbl_diretor where id_diretor=${id}`
  
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

    let sql = `select id from tbl_diretor order by id_diretor desc limit 1`
  
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
    const sql = `
  INSERT INTO tbl_diretor (
    nome,
    data_nascimento,
    data_falecimento,
    is_ativo,
    biografia,
    foto
  ) VALUES (
    '${diretores.nome}',
    '${diretores.data_nascimento}',
    ${diretores.data_falecimento ? `'${diretores.data_falecimento}'` : null},
    ${diretores.is_ativo},
    '${diretores.biografia}',
    '${diretores.foto}'
  );
`
  

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
        let sql = `UPDATE tbl_ator SET
    nome = '${diretores.nome}',
    data_nascimento = '${diretores.data_nascimento}',
    data_falecimento = '${diretores.data_falecimento}',
    biografia = '${diretores.biografia}',
    is_ativo = ${diretores.is_ativo},
    foto = '${diretores.foto}'
WHERE id_ator = ${diretores.id};`
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
      let sql = `delete from tbl_diretor where id_diretor = ${id} `
  
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



