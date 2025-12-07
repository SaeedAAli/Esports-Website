const router = (app) => {
    const gamesController = require("../controllers/games");
    const playerController = require("../controllers/player");
    app.get("/games", gamesController.getAllGames);
    app.get("/players", playerController.getAllPlayers)
    // Add your other routes in here
    app.get("/", (request, response) => {
        response.render("./pages/index", {
            title: "Saeeds Page Title"
        });
    });
    app.get("/goodbye", (request, response) => {
        response.render("./pages/index", {
            title: "Goodbye World"
        });
    });
    app.get("/Error", (request, response) => {
        response.render("../views/pages/Error", {
            title: "Error"
        });
    });
    app.get("/newstab", (request, response) => {
        response.render("../views/pages/newstab", {
            title: "News Tab"
        });
    });
    
    app.get("/games/add", function(request, response){
        response.render("./pages/addGame")
    });
    app.post("/games/add",gamesController.addGame);
    
    app.get("/games/edit/:id",gamesController.renderEditGamePage);

    app.post("/games/edit/:id",gamesController.editGame)

    app.get("/games/:id",gamesController.getGameById);

    app.get("/games/delete/:id",gamesController.renderDeleteGame)

    app.post("/games/delete/:id",gamesController.deleteGame);

    app.get("/players/add", function(request, response){
        response.render("./pages/addPlayer")
    });
    app.post("/players/add",playerController.addPlayer);

    app.get("/players/edit/:id",playerController.renderEditPlayer);

    app.post("/players/edit/:id", playerController.editPlayer)

    app.get("/players/:id", playerController.getPlayer);

    app.get("/players/delete/:id",playerController.renderDeleteplayer)

    app.post("/players/delete/:id",playerController.deletePlayer);
    
};


module.exports = router 


