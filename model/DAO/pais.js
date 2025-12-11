/*********************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de ator no Banco de Dados MySQL
 * Data: 27/11/2025
 * Autor: Davi de Almeida
 * Versão: 1.0
 **********************************************************************************************/

//Import da biblioteca do PrismaClient

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSelectAllPais = async function () {
    try {
        let sql = 'select * from tbl_pais order by id_pais desc'


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



const getSelectPaisById = async function (id) {
    try {
        let sql = `select * from tbl_pais where id_pais = ${id}`

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

const getSelectLastId = async function () {
    try {
        let sql = 'select id_pais from tbl_pais order by id_pais desc limit 1'

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

const setinsertPais = async function (pais) {

    try {
     const sql = `INSERT INTO tbl_pais(nome) VALUES ('${pais.nome}')`;
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }

    } catch (error) { console.log(error)
        return false
    }

}


const setupdatepais = async function (pais) {

    try {
        let sql = `update tbl_pais
        set 
        nome ='${pais.nome}'
        where id_pais = ${pais.id}
      `

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) { console.log(error)

        return false
    }
}

    const setDeletePais = async function (id) {
        try {
            let sql = `delete from tbl_pais where id_pais = ${id}`
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
getSelectAllPais,
getSelectPaisById,
getSelectLastId,
setinsertPais,
setupdatepais ,
setDeletePais



}

