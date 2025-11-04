/******************************************************************************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 021/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
**************************************************************************************************************************************************************************************************************/



//importa a biblioteca do prisma/client
const { PrismaClient } = require('../../generated/prisma')


//cria um objeto do prisma client para manipular
const prisma = new PrismaClient()

const getSelecAllAtores = async function(){
    try{

  let sql = 'select * from tb_atores order by id desc'

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

const  getSelectAllByIdAtores = async function(id){
  try{

    let sql = `select * from tb_atores where id=${id}`
  
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

const getSelectLastIDatores = async function (id) {
  try{

    let sql = `select id from tb_atores order by id desc limit 1`
  
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
const setInsertAtores = async function (atores) {
    try {
      let sql = `INSERT INTO tb_atores (
        nome,
        nacionalidade,
        data_nascimento,
        data_obito,
        premiacoes,
        foto
      ) VALUES (
        '${atores.nome}',
        '${atores.nacionalidade}',
        '${atores.data_nascimento}',
        ${atores.data_obito},
        ${atores.premiacoes},
        '${atores.foto}'
      );`
  
      let result = await prisma.$executeRawUnsafe(sql);
  
      if (result)
        return true;
      else
        return false;
    } catch (error) {
      return false;
    }
  }

  const setUpdateAtores = async function (atores) {
    try {
      let sql = `UPDATE tb_atores set
        nome = '${atores.nome}',
        nacionalidade = '${atores.nacionalidade}',
        data_nascimento = '${atores.data_nascimento}',
        data_obito = '${atores.data_obito}',
        premiacoes = '${atores.premiacoes}',
        foto = '${atores.foto}'
        where id = ${atores.id}`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else
        return false
  
    } catch (error) {
      console.log(error)
      return false
    }
  }

const deleteUpdateAtores = async function (id) {
  try{
    let sql = `delete from tb_atores where id = ${id} `

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
    getSelecAllAtores,
    getSelectAllByIdAtores,
    setInsertAtores,
    setUpdateAtores,
    deleteUpdateAtores,
    getSelectLastIDatores,
    setInsertAtores

}