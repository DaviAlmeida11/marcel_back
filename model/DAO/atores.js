/******************************************************************************************************************************************************************************************************************************************************** 
* Objetivo : Aquivo responsavel pela realização do CRUD de filmes 
* Data : 021/10/2025
* Autor : Davi de Almeida Santos 
* Versão : 1.0
**************************************************************************************************************************************************************************************************************/



//importa a biblioteca do prisma/client
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//cria um objeto do prisma client para manipular

const getSelecAllAtores = async function(){
    try{

  let sql = 'select * from tbl_ator order by id_ator desc'

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

    let sql = `select * from tbl_ator where id_ator = ${id}`
  
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

    let sql = `select id_ator from tbl_ator order by id_ator desc limit 1`
  
    let result = await prisma.$queryRawUnsafe(sql)
  
    // Validação para identificar se retornou uma arry (vazio ou com dado
  
      if (result)
        return true;
      else
        return false;
    } catch (error) { console.log(error)
      return false;
    }
  }

const setInsertAtores = async function (atores) {
    try {
  const sql = `
  INSERT INTO tbl_ator (
    nome,
    data_nascimento,
    data_falecimento,
    is_ativo,
    biografia,
    foto
  ) VALUES (
    '${atores.nome}',
    '${atores.data_nascimento}',
    ${atores.data_falecimento ? `'${atores.data_falecimento}'` : null},
    ${atores.is_ativo},
    '${atores.biografia}',
    '${atores.foto}'
  );
`
      let result = await prisma.$executeRawUnsafe(sql);
  
      if (result)
        return true;
      else
        return false;
    } catch (error) { console.log(error)
      return false;
    }
  }

  const setUpdateAtores = async function (atores) {
    try {
      let sql = `UPDATE tbl_ator SET
    nome = '${atores.nome}',
    data_nascimento = '${atores.data_nascimento}',
    data_falecimento = '${atores.data_falecimento}',
    biografia = '${atores.biografia}',
    is_ativo = ${atores.is_ativo},
    foto = '${atores.foto}'
WHERE id_ator = ${atores.id};`
  
      let result = await prisma.$executeRawUnsafe(sql)
  
      if (result)
        return true
      else
        return false
  
    } catch (error) { console.log(error)
    
      return false
    }
  }

const deleteUpdateAtores = async function (id) {
  try{
    let sql = `delete from tbl_ator where id_ator = ${id} `

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