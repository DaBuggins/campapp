const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedsHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63d4e8811c2dc298e7caacf5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, ea. Sit atque, eius assumenda dolorem alias ea iste dolorum totam aut quia reiciendis, maxime qui praesentium, quaerat voluptatum iure? Beatae?',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images: [ 
              {
                url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                filename: 'Yelpcamp/fk1ut2jlwlw2jbhfanwl',
              },
              {
                url: 'https://res.cloudinary.com/deskiol0z/image/upload/v1675584764/Yelpcamp/jjbyrmurvdbhwxvidiqs.png',
                filename: 'Yelpcamp/jjbyrmurvdbhwxvidiqs',
              },
              {
                url: 'https://res.cloudinary.com/deskiol0z/image/upload/v1675584765/Yelpcamp/gcyum3tsdpmg80diiptq.png',
                filename: 'Yelpcamp/gcyum3tsdpmg80diiptq',
              }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});