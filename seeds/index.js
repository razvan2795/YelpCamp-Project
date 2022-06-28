const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser:  true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});


 const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
         const random1000 = Math.floor(Math.random() * 1000);
         const price = Math.floor(Math.random() *20) +10;
         const camp = new Campground({
             author: '62b80ba4c0335373b2efacef',
             location: `${cities[random1000].city}, ${cities[random1000].state}`,
             title: `${sample(descriptors)} ${sample(places)}`,
             description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, sunt veritatis vitae sequi minus repellendus soluta deserunt. Perspiciatis voluptate, eum, velit autem minus deserunt modi vero soluta accusamus iusto officiis Fuga dolorum aliquam numquam totam omnis? Minus saepe iure inventore! Delectus, neque accusantium qui atque exercitationem quo nostrum rerum quod iste asperiores, veniam reiciendis dolorem ducimus quibusdam laborum deserunt maxime? Dolorum iusto quidem animi molestiae dolore laborum, fuga accusamus atque modi ea et, amet saepe ratione magnam explicabo totam similique optio necessitatibus temporibus dolores tempore tempora distinctio repellat accusantium. Debitis?',
             price: price,
             images: [
                {
                  url: 'https://res.cloudinary.com/dhmda7qcf/image/upload/v1656305186/YelpCamp/fmityosnw0i6prlsalb4.avif',
                  filename: 'YelpCamp/fmityosnw0i6prlsalb4',
                },
                {
                  url: 'https://res.cloudinary.com/dhmda7qcf/image/upload/v1656305187/YelpCamp/a4dvtitangenxlz7lu4l.avif',
                  filename: 'YelpCamp/a4dvtitangenxlz7lu4l',
                }
              ]
         });
         await camp.save()
    }
}
console.log(descriptors)
console.log(places)

seedDB().then(() => {
    mongoose.connection.close()
})

