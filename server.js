const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");

require("dotenv").config();

const ProductSchema = mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    // rating:{"rate":3.9,"count":120}
});
const Product = mongoose.model('Product', ProductSchema);


app.use(express.json());
app.use(express.static("client/build"));

app.get("/api/products", (req, res) => {
    const { title } = req.query;
    const { minMax, category } = req.body;
    Product.find({}).exec().then((productsArr) => {
        let shownProducts = productsArr;

        if (minMax) {
            shownProducts = shownProducts.filter((product) =>
                product.price <= minMax[1] && product.price >= minMax[0]);
        }

        if (category) {
            shownProducts = shownProducts.filter((product) =>
                product.category === category);
        }

        if (title) {
            shownProducts = shownProducts.filter((product) =>
                product.title.includes(title));
        }

        res.send(shownProducts.length ? shownProducts : "no products");
    });
});

app.get("/api/products/:id", (req, res) => {
    fs.readFile("products.json", "utf8", (err, products) => {
        const productsArr = JSON.parse(products);
        res.send(productsArr.find((product) => product.id === +req.params.id));
    });
})

app.post("/api/products", (req, res) => {
    Product.insertMany({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
    }).then((addedProduct) => {
        res.send(addedProduct);
    });
});


app.put("/api/products/:id", (req, res) => {
    fs.readFile("products.json", "utf8", (err, products) => {
        const productsArr = JSON.parse(products);
        // const { title, price, description, category, image } = req.body;
        const { id } = req.params;
        const newArr = productsArr.map((product) => {
            const { title = product.title, price = product.price, description = product.description,
                category = product.category, image = product.image } = req.body;
            if (product.id === +id) {

                return {
                    ...product,
                    title,
                    price,
                    description,
                    category,
                    image
                }


            }

            else return product;
        });
        fs.writeFile("products.json", JSON.stringify(newArr), (err) => {
            console.log(err);
            res.send("success");
        });
    });
});

app.delete("/api/products/:id", (req, res) => {
    fs.readFile("products.json", "utf8", (err, products) => {
        const productsArr = JSON.parse(products);
        const newArr = productsArr.filter(product => product.id !== +req.params.id)
        fs.writeFile("products.json", JSON.stringify(newArr), (err) => {
            console.log(err);
            res.send("success");
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});


console.log(process.env.username1)
console.log(process.env.password)
console.log(process.env.host)
console.log(process.env.name)
console.log(process.env.port)
mongoose
    .connect(`mongodb+srv://${process.env.username1}:${process.env.password}@${process.env.host}/${process.env.name}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("connected");
        const port = process.env.PORT || 5000;
        app.listen(port);

        console.log(`Listening on ${port}`);
        // app.listen(process.env.port||5000);
    });
