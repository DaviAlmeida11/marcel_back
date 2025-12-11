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

// Torna todos os filmes do banco de dados
const getselectAllFilms = async function(){
    try{
        let sql = 'select * from tbl_filme order by id desc';

        let result = await prisma.$queryRawUnsafe(sql);

        if(Array.isArray(result))
            return result;
        else
            return;

    }catch (error){  console.log(error)
        return false;
    }
}

// Torna todos os IDs filmes do banco de dados 
const getSelectAllByIdFilms = async function(id){
  try{
    let sql = `select * from tbl_filme where id = ${id}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if(Array.isArray(result))
      return result;
    else
      return false;

  }catch (error){console.log(error)
      return false;
  }
}

const getSelectLastID = async function () {
  try{
    let sql = `select id from tbl_filme order by id desc limit 1`;

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
// insere um filme no banco de dados  
const setInsertFilms = async function(filme){
  try{
    let sql = `INSERT INTO tbl_filme (
      nome,
      sinopse,
      data_lancamento,
      duracao,
      orcamento,
      trailer,
      capa
    ) VALUES( '${filme.nome}',
              '${filme.sinopse}',
              '${filme.data_lancamento}',
              '${filme.duracao}',
              '${filme.orcamento}',
              '${filme.trailer}',
              '${filme.capa}');`;

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
      return true;
    else
      return false;

  }catch (error){
    return false;
  }
}

// atualiza um filme existente do banco de dados filtrado por um id
const setUpdateFilme = async function (filme) {
  try{
    let sql = `update tbl_filme set
      nome                = '${filme.nome}',
      sinopse             = '${filme.sinopse}',
      data_lancamento     = '${filme.data_lancamento}',
      duracao             = '${filme.duracao}',
      orcamento           = '${filme.orcamento}',
      trailer             = '${filme.trailer}',
      capa                = '${filme.capa}'
      where id = ${filme.id}`;

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
      return true;
    else
      return false;

  }catch (error){
    return false;
  }
}

// deleta um filme existente no banco de dados por um id
const deleteUpdateFilme = async function (id) {
  try{
    let sql = `delete from tbl_filme where id = ${id}`;

    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
      return true;
    else
      return false;

  }catch (error){
    return false;
  }
}

module.exports = { 
    getselectAllFilms,
    getSelectAllByIdFilms,
    getSelectLastID,
    setInsertFilms,
    setUpdateFilme,
    deleteUpdateFilme
};