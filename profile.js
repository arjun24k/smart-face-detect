const handleProfile = (req, res,mysqldb) => {
    const { id } = req.params;
    mysqldb.select('*').from('users').where({
        id: id
    }).then(
        user => {
            if (user.length) {
                res.json(user[0]);
            }
            else {
                res.status(404).json('not found')
            }
        }
    )
    res.status(404).json('error');

}

module.exports = {
    handleProfile:handleProfile
}