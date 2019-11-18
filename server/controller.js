module.exports = {
    createProduct: (req, res) => {
        const db = req.app.get('db')
        const {name, description, price, image_url} = req.body
        console.log(req.body)
        db.create_product([
             name,
             description,
             +price,
             image_url
        ]).then(result => {
            res.status(200).send(result)
        }).catch(err => {
            console.log(err)
        })
    },
    getProducts: (req, res) => {
        const db = req.app.get('db')
        db.read_products()
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            console.log(err)
        })
    },
    getProduct: (req, res) => {
        const db = req.app.get('db')
        db.read_product(req.params.id)
        .then(result => {
            res.status(200).send(result)
        }).catch(err => {
            console.log(err)
        })
    },
    update: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.update_product().then( () => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: 'oops! something went wrong'})
            console.log(err)
        })
    },
    delete: (req, res, next) => {
        const dbInstance = req.app.get('db')

        dbInstance.delete_product()
            .then (() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({errorMessage: `da fuck?`})
                console.log(err)
            })
    }
    
}