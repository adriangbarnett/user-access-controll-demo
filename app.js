express = require("express");
app = express();

// router
const appRouter = require("./routes/index.router.js");
app.use("/", appRouter)


// error
app.get("*", (req, res) => {
    res.send("404: " + req.url);
})

// start server
app.listen(3000, () => { console.log(`Listening on port: 3000`); });

