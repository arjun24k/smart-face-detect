const handleImage = (req, res,mysqldb,con) => {
    const { id } = req.body;
    mysqldb.select('*').from('users').where({
        id: id
    }).increment('entries', 1).then(
        entries => {
            var query = `select entries from users where id = ${id}`;
            con.query(query, function (err, result) {
                res.json(result[0].entries);
            });
        }
    ).catch(e => res.status(400).json('unable to get entries'))
}

module.exports ={
    handleImage:handleImage
}