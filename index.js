import express from "express";

const app = express();

const port = 3000;
/*
app.get("/", (req, res) => {
  res.send("Hello from Raju's Node.js server");
});

app.get("/ice-tea", (req, res) => {
  res.send("What would you like to drink?");
});

app.get("/twitter", (req, res) => {
  res.send("Rajender is on Twitter");
});
*/

//using the middleware
app.use(express.json());

let teaData = [];
let nextId = 1;

//add a new Tea = post is best way used to save the data
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});
//again get back array
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});
//how to get singel tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea is not found");
  }
  res.status(200).send(tea);
});
//update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea is not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});
//delet tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("deleted");
  // teaData = teaData.filter((t) => t.id !== parseInt(req.params.id));
});

app.listen(port, () => {
  console.log(`server is running at port: ${port}...`);
});

/*how to run the server
1. Open the terminal
2. Navigate to the folder where the file is saved
3. Run the command "node index.js"
4. Open the browser and type "http://localhost:3000/"
5. You will see the message "Hello from Raju's Node.js server"
6. To see the message "What would you like to drink?" type "http://localhost:3000/ice-tea"
7. To see the message "Rajender is on Twitter" type "http://localhost:3000/twitter"

OR

#to keep the server running, you can use nodemon
1. Open the terminal
2. Navigate to the folder where the file is saved
3. Run the command "nodemon index.js"
4. Open the browser and type "http://localhost:3000/"

OR

#you can go in pakage.json and add the following code to run the server using nodemon
"scripts": {
    "dev": "nodemon index.js"
  },
    then you can run the server using the command "npm run dev"



*/
