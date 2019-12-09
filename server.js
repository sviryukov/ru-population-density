import express from "express";
import route from "./route";

const app = express();

const port = 8080;

let router = route();
app.use(router);

app.use(express.static("assets"));

app.listen(port, () => {
    console.log("We are live on " + port);
});