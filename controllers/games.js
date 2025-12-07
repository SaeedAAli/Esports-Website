// You may need to edit this path.
const { request } = require("express");
const pool = require("../data/config.js");

function getAllGames(request, response, next){

    pool.query(`SELECT * FROM game`, (error, result) => {
        if (error){
            throw error;
        }
        // Allows you to check the result - on the webpage:
        //response.send(result);
        // Or, by looking in the server console:
        //console.log(result);
        response.render("../views/pages/games", {
            gamesArr: result,
            query: request.query,
            title: "Games"
        });
    });
};

const getGameById = (request, response, next) => {
    const id = request.params.id;
    pool.query(`
        SELECT * FROM game
        WHERE game.game_id = ?`, id, (error, result) => {
        if (error){
            throw error;
        }
        console.log(result);
        response.render("../views/pages/gamesCopy", {
            gamesArr: result,
            query: request.query,
            title: "Games"
        });
    });
};

const renderEditGamePage = (request, response, next) => {
    const id = request.params.id;
    pool.query(`
        SELECT * FROM game
        WHERE game.game_id = ?`, id, (error, result) => {
        if (error){
            throw error;
        }
        console.log(result);
        response.render("../views/pages/Editgame", {
            game: result[0],
            query: request.query,
            title: "Games"
        });
    });
};

const renderDeleteGame = (request, response, next) => {
    const id = request.params.id;
    pool.query(`
        SELECT * FROM game
        WHERE game.game_id = ?`, id, (error, result) => {
        if (error){
            throw error;
        }
        console.log(result);
        response.render("../views/pages/deletePages", {
            game: result[0],
            query: request.query,
            title: "Games"
        });
    });
};



const addGame = (request, response, next) => {
    console.log("INSERT GAME: ");
    console.log(request.body);
    pool.query("INSERT INTO game SET ?", request.body, (error, result) => {
        if (error){
            throw error;
        }
        response.redirect(`/games?name=${request.body.name}.`);
    });
};

const editGame = (request, response, next) => {
    const id = request.params.id;
    console.log(request.body);
    pool.query(`UPDATE game SET ? WHERE game_id = ?`, [request.body, id], (error, result) => {
        if (error) {
            throw error;
        }
        response.redirect(`/games?=name${request.body.name}.`);
    }); 
};

const deleteGame = (request, response, next) => {
    const id = request.params.id;

    pool.query(`DELETE FROM game WHERE game_id = ?`, id, (error, result) => {
        if (error){
            throw error;
        }
        console.log(request.body);
        response.redirect(`/games?name=${request.body.name}.`);
    });
};



// You should add controller methods to render forms, too...
module.exports = {
    getAllGames,
    getGameById,
    addGame,
    editGame,
    renderEditGamePage,
    deleteGame,
    renderDeleteGame,
    
};