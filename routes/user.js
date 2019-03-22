// User routes below

app.post('/users', (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    // save user to the database
    user.save().then((user) => {
        res.send(user)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })


});



