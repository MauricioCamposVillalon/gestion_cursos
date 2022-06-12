const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    port: 5432,
    database: 'cursos',
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
});

const leer = () => {
    return new Promise(async (resolve, reject) => {
        
        const consulta = {
            text: "SELECT id, nombre, nivel, TO_CHAR(fecha_inicio, 'yyyy-mm-dd') as fecha_inicio, duracion FROM cursos"
        }
        try {
            const result = await pool.query(consulta);
            resolve(result.rows)
        } catch (error) {
            reject(error)            
        }
    })
}

const create = (datos) => {
    return new Promise(async (resolve, reject) => {
        const consulta = {
            text: "INSERT INTO cursos(nombre, nivel, fecha_inicio, duracion) VALUES($1, $2, $3, $4) RETURNING *",
            values: datos
        }
        try {
            const result = await pool.query(consulta);
            resolve(result.rows[0])
        } catch (error) {
            reject(error)            
        }
    })
}


const edit = (datos) =>{
    return new Promise(async (resolve, reject) => {
        const consulta = {
            text: " UPDATE cursos SET nombre=$2, nivel=$3, fecha_inicio=$4, duracion=$5  WHERE id=$1 RETURNING *",
            values: datos
        }
        try {
            const result = await pool.query(consulta);
            resolve(result.rows[0])
        } catch (error) {
            reject(error)            
        }
    })

}


const borrar = (id)=>{
    return new Promise (async (resolve, reject) => {
        const consulta = {
            text: "DELET FROM cursos WHERE if =$1 RETURNING *",
            values: [id]
        }
        try {
            const result = await pool.query(consulta);
            resolve(result.rows[0])
        } catch (error) {
            reject(error)            
        }

    })

}


module.exports = { leer, create, edit, borrar }