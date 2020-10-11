const handleSignIn = (req,res,mysqldb,bcrypt,con) => {
    const { name, email, password } = req.body;
    mysqldb.select('email','hashPass').from('login')
        .where({
            email:email
        })
        .then(
        data =>{
            var hashPass = data[0].hashPass;
            const isValid=bcrypt.compareSync(password,hashPass);
            if(isValid){
                var query = `select * from users where email='${email}'`
                con.query(query,function(err,result){
                    if(err) res.status(400).json('unable to get user')
                    res.json(result);    
                }) 
            }
            else
            res.status(400).json('wrong creds')
        }
    ).catch(e=>res.status(400).json('invalid creds'))
    }
module.exports ={
    handleSignIn:handleSignIn
}