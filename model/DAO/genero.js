
/******************************************************************************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 021/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
**************************************************************************************************************************************************************************************************************/



//importa a biblioteca do prisma/client
const {PrismaClient} = require('../../generated/prisma')
 

//cria um objeto do prisma client para manipular
const prisma = new PrismaClient()

const getselectAllGenerous = async function(){
    try{

  let sql = 'select * from tb_genero order by id desc'

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
    let sql = `select * from tb_genero where id=${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if(Array.isArray(result))
      return result
    else
    return false

  }catch (error){
    return false
  }
  
}



const getSelectLastIdGenerous = async function (id) {
  try{

    let sql = `select id from tb_genero order by id desc limit 1`
  
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
const setInsertGenerous = async function(genero){
  try{
    let sql = `INSERT INTO tb_genero (
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
    let sql = `update tb_genero set
    nome                = '${genero.nome}',
   
   where id = ${genero.id}`

   let = result = await prisma.$executeRawUnsafe(sql)

   if(result)
    return true 
  else
   return false
  }catch (error){
    
    return false 
  }

    
}


const deletGenerous = async function(id) {
  try {
    let sql = `delete from tb_genero where id=${id}`

    let result = await prisma.$executeRawUnsafe(sql)
 
    if(result ) 
      return true  
      else
      return false 
    }catch (error){
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