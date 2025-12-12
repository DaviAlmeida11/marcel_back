/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme_genero no Banco de Dados MySQL
 * Data: 05/11/2025
 * Autor: Eduardo Feitosa
 * Versão: 2.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSelectAllFilmsGenre = async function() {
    try {
        let sql = 'select * from tbl_filme_genero order by id_filme_genero desc'

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

const getSelectByIdFilmGenre = async function(id) {
    try {
        let sql = `select * from tbl_filme_genero where id_filme_genero =${id}`

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


const getSelectGenresByFilmeId = async function(filmeId) {
    try {
        let sql = `select tbl_genero.id_genero, tbl_genero.nome 
                 from tbl_filme 
                 inner join tbl_filme_genero 
                  on tbl_filme.id = tbl_filme_genero.id_filme
                  inner join tbl_genero 
                 on tbl_genero.id_genero = tbl_filme_genero.id_genero
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
const getSelectFilmsByGeneroId = async function(generoId) {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme
                            inner join tbl_genero
                                on tbl_genero.id_genero = tbl_filme_genero.id_genero
                        where tbl_genero.id_genero = ${generoId}`

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
        let sql = 'select id_filme_genero from tbl_filme_genero order by id_filme_genero desc limit 1'

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

const setInsertFilmsGenres = async function(filmeGenero) {
    try {
        let sql = `insert into tbl_filme_genero(id_filme, id_genero) values (${filmeGenero.id_filme}, ${filmeGenero.id_genero})`

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

const setUpdateFilmsGenres = async function(filmeGenero) {
    try {
        let sql = `UPDATE tbl_filme_genero
        SET id_filme = ${filmeGenero.id_filme}, 
        id_genero = ${filmeGenero.id_genero}
        WHERE id_filme_genero = ${filmeGenero.id_filme_genero}`

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


const setDeleteFilmsGenresByFilmeId = async function(filmeId) {
    try {
        let sql = `delete from tbl_filme_genero where id_filme = ${filmeId}`

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

const setDeleteFilmsGenres = async function(id) {
    try {
        let sql = `delete from tbl_filme_genero where id_filme_genero = ${id}`

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
    getSelectAllFilmsGenre,
    getSelectByIdFilmGenre,
    getSelectGenresByFilmeId,
    getSelectFilmsByGeneroId,
    getSelectLastId,
    setInsertFilmsGenres,
    setUpdateFilmsGenres,
    setDeleteFilmsGenresByFilmeId,
    setDeleteFilmsGenres
}