/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme_genero no Banco de Dados MySQL
 * Data: 12/11/2025
 * Autor: Davi de Almeida
 * Versão: 2.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSelectAllFilmLEnguage = async function() {
    try {
        let sql = 'select * from tbl_filme_idioma order by id_filme_idioma desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectByIdFilmLEnguage = async function(id) {
    try {
        let sql = `select * from tbl_filme_idioma where id_filme_idioma = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


const getSelectFilmLEnguageFilmId = async function(filmeId) {
    try {
        let sql = `select tbl_idioma.id_idioma, tbl_idioma.nome 
                 from tbl_filme 
                 inner join tbl_filme_idioma
                  on tbl_filme.id = tbl_filme_idioma.id_filme
                  inner join tbl_idioma
                 on tbl_idioma.id_idioma = tbl_filme_idioma.id_idioma
                where tbl_filme.id = ${filmeId}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Retorna os filmes filtrando pelo ID do genero do banco de dados
const getSelectFilmforLenguageId = async function(idiomaId) {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                        from tbl_filme
                            inner join tbl_filme_idioma
                                on tbl_filme.id = tbl_filme_idioma.id_filme
                            inner join tbl_idioma
                                on tbl_idioma.id_idioma = tbl_filme_idioma.id_idioma
                        where tbl_idioma.id_idioma = ${idiomaId}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const getSelectLastId = async function() {
    try {
        let sql = 'select id_filme_idioma  from tbl_filme_idioma  order by id_filme_idioma  desc limit 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const setInsertFilmeIdioma = async function(filmeIdioma) {
    try {
        let sql = `insert into tbl_filme_idioma(id_filme, id_idioma) values (${filmeIdioma.id_filme}, ${filmeIdioma.id_idioma})`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const setUpdateFilmeIdioma = async function(filmeIdioma) {
    try {
        let sql = `UPDATE tbl_filme_idioma
        SET id_filme = ${filmeIdioma.id_filme}, 
        id_idioma = ${filmeIdioma.id_idioma}
        WHERE id_filme_idioma = ${filmeIdioma.id}`
console.log(sql)
     let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


const setDeleteFilmeIdiomaByFilm = async function(filmeId) {
    try {
        let sql = `delete from tbl_filme_idioma where id_filme = ${filmeId}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const setDeleteFilmLenguage = async function(id) {
    try {
        let sql = `delete from tbl_filme_idioma where id_filme_idioma = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllFilmLEnguage,
    getSelectByIdFilmLEnguage,
    getSelectFilmLEnguageFilmId,
    getSelectFilmforLenguageId,
    getSelectLastId,
    setInsertFilmeIdioma,
    setUpdateFilmeIdioma,
    setDeleteFilmeIdiomaByFilm,
    setDeleteFilmLenguage 

}