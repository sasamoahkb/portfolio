const express = require("express");
const path = require("path");

const app = express();
const db = require('./services/db');
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set up the static directory for serving CSS and images
app.use(express.static(path.join(__dirname, "../src")));

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Example routes for serving your HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/home.html")); // Serve the home page
});

app.get("/education", (req, res) => {
  res.sendFile(path.join(__dirname, "views/education.html")); // Serve the education page
});

app.get("/cybersec", (req, res) => {
  res.sendFile(path.join(__dirname, "views/cybersec.html")); // Serve the projects page
});

// Add more routes for the rest of your HTML files
app.get("/resume", (req, res) => {
  res.sendFile(path.join(__dirname, "views/resume.html"));
});

app.get("/skills", (req, res) => {
  res.sendFile(path.join(__dirname, "views/skills.html"));
});

app.get("/webdev", (req, res) => {
  res.sendFile(path.join(__dirname, "views/webDev.html"));
});

// app.get("/dashboard",(req,res)=>{
//     sql = 'select * from festivals';
//     imageUrls = []
//     db.query(sql).then(results => {
//         // console.log(results);
//         results.forEach(portImage => {
//             console.log("--->", portImage);
//           });
//         res.render("dashboard",{"title":"dashboard","heading":"myheadIng","data":results});
//     });
// })

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`helloworld: listening on port ${PORT}`);
  console.log(`Server is running on http://localhost:${PORT}`);
});
