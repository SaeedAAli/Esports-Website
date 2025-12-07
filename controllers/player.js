// You may need to edit this path.
const { request } = require("express");
const pool = require("../data/config.js");

const getAllPlayers = (request, response, next) => {
    pool.query(`SELECT * FROM player`, (error, result) => {
        if (error){
            throw error;
        }
        console.log(result);
        response.render("../views/pages/players", {
            playerArr: result,
            query: request.query,
            title: "Games"
        });
    });
};

const getPlayer = (request, response, next) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM player WHERE player.player_id = ?`, id, (error, result) => {
        if (error){
            throw error;
        }
        console.log(result);
        response.render("../views/pages/playersCopy", {
            playerArr: result,
            query: request.query,
            title: "Players"
        });
    });
};

const addPlayer = (request, response, next) => {
    console.log("INSERT PLAYER: ");
    console.log(request.body);
    pool.query("INSERT INTO Player SET ?", request.body, (error, result) => {
        if (error){
            throw error;
        }
        response.redirect(`/Players?name=${request.body.name}.`);
    });
};

const editPlayer = (request, response, next) => {
    const id = request.params.id;
    console.log(request.body);
    pool.query(`UPDATE player SET ? WHERE player_id = ?`, [request.body, id], (error, result) => {
        if (error) {
            throw error;
        }
        response.redirect(`/Players?=name${request.body.name}.`);
    }); 
};

const deletePlayer = (request, response, next) => {
    const id = request.params.id;

    pool.query(`DELETE FROM player WHERE player_id = ?`, id, (error, result) => {
        if (error){
            throw error;
        }
        console.log(request.body);
        response.redirect(`/players?name=${request.body.name}.`);
    });
};

const renderEditPlayer = (request, response, next) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM player WHERE player.player_id = ?`, id, (error, result) => {
        if (error){
            throw error;
        }
        console.log(result);
        response.render("../views/pages/editPlayer", {
            player: result[0],
            query: request.query,
            title: "Players"
        });
    });
};

const renderDeleteplayer = (request, response, next) => {
    const id = request.params.id;
    pool.query(`
        SELECT * FROM player WHERE player.player_id = ?`, id, (error, result) => {
        if (error){
            throw error;
        }
        console.log(result);
        response.render("../views/pages/deletePlayers", {
            player: result[0],
            query: request.query,
            title: "Players"
        });
    });
};









module.exports = {
    getAllPlayers,
    addPlayer,
    editPlayer,
    deletePlayer,
    renderEditPlayer,
    renderDeleteplayer,
    getPlayer

};





