const mysql = require('mysql2');
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_market_nest',
});
console.log("[Pool]> Iniciado");

pool.on('release', () => console.log('[Pool]> Conexão retornada'));

process.on('SIGINT', () => 
    pool.end(err => {
        if(err) 
            return console.log(err);
            
        console.log('[Pool]> Fechado');
        process.exit(0);
    })
); 

module.exports = pool;