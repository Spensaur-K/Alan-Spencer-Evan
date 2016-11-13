const socket = io.connect();

exports.order = function(req) {
        socket.emit("order", req);
}