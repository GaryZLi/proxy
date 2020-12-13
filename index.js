import axios from 'axios';
import cheerio from 'cheerio';



const req = async () => {
    let ip_addresses = [];
    let port_numbers = [];

    await axios.get("https://sslproxies.org/")
        .then(response => {
            const $ = cheerio.load(response.data);
            $("td:nth-child(1)").each(function (index, value) {
                ip_addresses[index] = $(this).text();
            });

            $("td:nth-child(2)").each(function (index, value) {
                port_numbers[index] = $(this).text();
            });

        })
        .catch(err => console.log(err));

    let random_number = Math.floor(Math.random() * 20);

    const options = {
        proxy: {
            host: `${ip_addresses[random_number]}`,
            port: `${port_numbers[random_number]}`
        }
    };


    // 
    axios.get("https://www.amazon.com/Marvels-Spider-Man-Miles-Morales-Launch-PlayStation/dp/B08JHVG9ZJ/ref=sr_1_1?dchild=1&keywords=ps5&qid=1605337745&sr=8-1", options)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
};

req();