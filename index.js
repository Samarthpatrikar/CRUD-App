const mysql= require('mysql2') ;
const express = require('express') ;
var app = express() ;
const bodyparser = require('body-parser');

app.use(bodyparser.json());




var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sampat123',
    database: 'firstdb',
    multipleStatements : true
  
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DataBase connection succeded.');
    else
        console.log('DataBase connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server is running at port 3000'));

app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
            
        else
            console.log(err);
    })
});

app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM employee WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});



app.post('/employees', (req, res) => {
    let id = req.query.id ;
    let Country = req.query.Country ;
    let Name = req.query.Name ;
    let sql = 'INSERT INTO employee(id,Name,Country) VALUE(?,?,?)' ;
    mysqlConnection.query(sql, [id ,Name, Country], (err, rows, fields) => {
                if (!err)
                 
                        
                 res.send('Inserted employee');
                    
                else
                    console.log(err);
    })
});

app.patch('/employees/:id', (req, res) => {
    const id = req.params.id ;
    let emp = req.body;
    var sql = "update employee set Name=? , Country=? where id =?";
    mysqlConnection.query(sql, [emp.Name, emp.Country,id], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
        res.send('ID not Found');
            console.log(err);
    })
});