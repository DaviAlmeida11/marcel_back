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

const getSelectAllIdioma = async function () {
    try {
        let sql = 'select * from tbl_idioma order by id_idioma desc'


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



const getSelectidiomaById = async function (id) {
    try {
        let sql = `select * from tbl_idioma where id_idioma= ${id}`

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
        let sql = 'select id_idioma from tbl_idioma order by id_idioma desc limit 1'

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

const setinsertidioma = async function (idioma) {

    try {
     const sql = `INSERT INTO tbl_idioma(nome) VALUES ('${idioma.nome}')`;
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


const setupdateidioma = async function (idioma) {

    try {
        let sql = `update tbl_idioma
        set 
        nome ='${idioma.nome}'
        where id_idioma = ${idioma.id}
      `

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

    const setDeletePais = async function (id) {
        try {
            let sql = `delete from tbl_idioma where id_idioma = ${id}`
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
getSelectAllIdioma,
getSelectidiomaById,
getSelectLastId,
setinsertidioma,
setupdateidioma,
setDeletePais 


}

