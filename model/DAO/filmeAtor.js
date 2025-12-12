/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme_genero no Banco de Dados MySQL
 * Data: 05/11/2025
 * Autor: Eduardo Feitosa
 * Versão: 2.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSelectAllFilmActor = async function() {
    try {
        let sql = 'select * from tbl_filme_ator order by id_filme_ator  desc'

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

const getSelectByIdFilmActor = async function(id) {
    try {
        let sql = `select * from tbl_filme_ator where id_filme_ator = ${id}`
console.log(sql)
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


const getSelectFilmActorFIlmId = async function(filmeId) {
    try {
        let sql = `select tbl_ator.id_ator, tbl_ator.nome 
                 from tbl_filme 
                 inner join tbl_filme_ator
                  on tbl_filme.id = tbl_filme_ator.id_filme
                  inner join tbl_ator
                 on tbl_ator.id_ator = tbl_filme_ator.id_ator
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
const getSelectFilmforActorId = async function(atorId) {
    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                        from tbl_filme
                            inner join tbl_filme_ator
                                on tbl_filme.id = tbl_filme_ator.id_filme
                            inner join tbl_ator
                                on tbl_ator.id_ator = tbl_filme_ator.id_ator
                        where tbl_ator.id_ator = ${atorId}`

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
        let sql = 'select id_filme_ator  from tbl_filme_ator  order by id_filme_ator  desc limit 1'

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

const setInsertFilmeActor = async function(filmeGenero) {
    try {
        let sql = `insert into tbl_filme_ator(id_filme, id_ator) values (${filmeGenero.id_filme}, ${filmeGenero.id_ator})`

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

const setUpdateFilmeActor = async function(filmeGenero) {
    try {
        let sql = `UPDATE tbl_filme_ator
        SET id_filme = ${filmeGenero.id_filme}, 
        id_ator = ${filmeGenero.id_ator}
        WHERE id_filme_ator = ${filmeGenero.id}`

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


const setDeleteFilmActorByFilm = async function(filmeId) {
    try {
        let sql = `delete from tbl_filme_ator where id_ator = ${filmeId}`

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

const setDeleteFilmActor = async function(id) {
    try {
        let sql = `delete from tbl_filme_ator where id_filme_ator = ${id}`

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
    getSelectAllFilmActor,
    getSelectByIdFilmActor,
   getSelectFilmActorFIlmId,
    setInsertFilmeActor,
    getSelectLastId,
    getSelectFilmforActorId ,
    setUpdateFilmeActor,
    setDeleteFilmActorByFilm,
    setDeleteFilmActor
}