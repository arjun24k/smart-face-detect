const handleRegister = (req,res,mysqldb,bcrypt,con) =>{
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    mysqldb('users').insert({
        email: email,
        name: name,
        joined: new Date()
    }).then(
        userid => mysqldb.insert({
            hashPass: hash,
            email: email
        }).into('login').then(
            resp => {
                console.log(userid)
                var query = `select * from users where id = ${userid[0]}`
                con.query(query, function (err, result) {
                    console.log(result);
                    res.json(result[0]);
                })
            })
    ).catch(err => res.status(400).json('unable to register'));
}

module.exports = {
handleRegister:handleRegister
};