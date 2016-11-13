export const socket = io.connect();

export function order(req) {
        socket.emit("order", req);
}

export function login(username, password) {
        socket.emit("login", {username, password});
}