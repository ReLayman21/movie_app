const express = require("express");
const morgan = require("morgan");
const app = express();

const fs = require("fs");
const path = require("path");

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("common", { stream: accessLogStream }));
app.use(express.static("public"));

let topMovies = [
  {
    title: "Pride & Prejudice",
    director: "Joe Wright",
    year: 2005,
  },
  {
    title: "How the Grinch Stole Christmas",
    director: "Ron Howard",
    year: 2000,
  },
  {
    title: "The Italian Job",
    director: "F. Gary Gary",
    year: 2003,
  },
  {
    title: "Mary Poppins",
    director: "Robert Stevenson",
    year: 1964,
  },
  {
    title: "Top Gun: Maverick",
    director: "Joseph Kosinski",
    year: 2022,
  },
  {
    title: "Avatar",
    director: "James Cameron",
    year: 2009,
  },
  {
    title: "Ocean's Eleven",
    director: "Steven Soderbergh",
    year: 2001,
  },
  {
    title: "Snow White and the Huntsman",
    director: "Rupert Sanders",
    year: 2012,
  },
  {
    title: "The Old Guard",
    director: "Gina Prince-Bythewood",
    year: 2020,
  },
  {
    title: "Troll",
    director: "Roar Uthaug",
    year: 2022,
  },
];

//GET requests
app.get("/", (req, res) => {
  res.send("Welcome to my Movie App");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send("This is not working right now. Please try again later.");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});
