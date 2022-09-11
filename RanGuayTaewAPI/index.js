const express = require('express'); // import express package
const app = express();
const PORT = 8080; 

const sort_DB = require("./db_sortSys.js"); // import table
const user_db = require("./db_user.js");

app.use( express.json() ) // use middleware to parse json before response

// fire API = listen to specific port
app.listen(  
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);

// get data from TABLE sortingSystem
app.get('/sorting-system', (request, response) => { 
    const statement = sort_DB.prepare(`SELECT * FROM sortingSystem`);
    const info = statement.all();
    response.json(info);
});

// get data from TABLE user
app.get('/user', (request, response) => { 
    const statement = user_db.prepare(`SELECT * FROM user`);
    const info = statement.all();
    response.json(info);
});

// insert new data TABLE sortingSystem
app.post('/sorting-system', (request, response) => { 
    const {id, year, month, day, hour, min, sec, section, color, status} = request.body;

    const statement = sort_DB.prepare(
        "INSERT INTO sortingSystem (id, year, month, day, hour, min, sec, section, color, status) VALUES (?,?,?,?,?,?,?,?,?,?)"
    );

    const info = statement.run(id, year, month, day, hour, min, sec, section, color, status); // go to ? = placeholder
    response.json(info);
});

// insert new data TABLE user
app.post('/user', (request, response) => { 
    const {id, user, time, purple, green, red, blue, yellow, status} = request.body;
    //console.log(request.body)
    //console.log(id, user, time, purple, green, red, blue, yellow, status)

    const statement = user_db.prepare(
        "INSERT INTO user (id, user, time, purple, green, red, blue, yellow, status) VALUES (?,?,?,?,?,?,?,?,?)"
    );

    const info = statement.run(id, user, time, purple, green, red, blue, yellow, status); // go to ? = placeholder
    response.json(info);
});

// DROP TABLE sortingSystem
app.delete("/sorting-system", (request, response) => {
    const { password } = request.body;
    
    if (!password) {
        response.status(418).send({ 'message' : 'Password is needed!' })
    }

    else if (password == "tssRGTno1") {
        const statement = sort_DB.prepare("DROP TABLE sortingSystem");
        const info = statement.run();
      
        response.json(info);
    }

});
  
// DROP TABLE user
app.delete("/user", (request, response) => {
    const { password } = request.body;

    if (!password) {
        response.status(418).send({ 'message' : 'Password is needed!' })
    }

    else if (password == "tssRGTno1") {
        const statement = user_db.prepare("DROP TABLE user");
        const info = statement.run();
      
        response.json(info);
    }

});