const socket = io.connect();

exports.order = function() {
        socket.emit("order", {
                type: "coffee",
                from: "Tim Hortens"
        });
}