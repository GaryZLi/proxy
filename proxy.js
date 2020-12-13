import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

let ip_addresses = [];
let port_numbers = [];

axios("https://sslproxies.org/")
    .then(response => {
        const $ = cheerio.load(response.data);

        $("td:nth-child(1)").each(function (index, value) {
            ip_addresses[index] = $(this).text();
        });

        $("td:nth-child(2)").each(function (index, value) {
            port_numbers[index] = $(this).text();
        });

    })
    .catch(err => err);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    let random_number = Math.floor(Math.random() * 100);

    res.send({
        host: ip_addresses[random_number],
        port: port_numbers[random_number]
    });
});

app.listen(5000, () => console.log('listening'));