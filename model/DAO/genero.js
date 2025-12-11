
/******************************************************************************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 021/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
**************************************************************************************************************************************************************************************************************/



//importa a biblioteca do prisma/client
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getselectAllGenerous = async function(){
    try{

  let sql = 'select * from tbl_genero order by id_genero desc'

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

const getSelectAllByIdGenerous = async function (id) {

  try{
    let sql = `select * from tbl_genero where id_genero=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if(Array.isArray(result))
      return result
    else
    return false

  }catch (error){
    return false
  }
  
}



const getSelectLastIdGenerous = async function () {
  try{

    let sql = `select id_genero from tbl_genero order by id_genero desc limit 1`
  
 let result = await prisma.$queryRawUnsafe(sql)
        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) { console.log(error)
        return false
    }
}
const setInsertGenerous = async function(genero){
  try{
    let sql = `INSERT INTO tbl_genero (
    nome
) VALUES('${genero.nome}');`

   let  result = await prisma.$executeRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){ 
    return false 
  }

}
const setUpdateGenero = async function (genero) {
  try{
    let sql = `UPDATE tbl_genero SET
    nome = '${genero.nome}'
WHERE id_genero = ${genero.id};`

   let  result = await prisma.$executeRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){ console.log(error)
    
    return false 
  }

    
}


const deletGenerous = async function(id) {
  try {
    let sql = `delete from tbl_genero where id_genero = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)
 
    if(result ) 
      return true  
      else
      return false 
    }catch (error){ console.log(error)
      return false
    }

}




module.exports = {
    getselectAllGenerous,
    setInsertGenerous,
    getSelectLastIdGenerous,
    setUpdateGenero,
    deletGenerous,
    getSelectAllByIdGenerous

}