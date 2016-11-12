module.exports = function(io) {
    io.on("connection", socket => {
        log("connection");
        socket.broadcast.emit("newcomer");
        socket.on("disconnect", () => {
            log("disconnect");
        })
    });
};

function log(route) {
    console.log("WS", "/"+route);
}