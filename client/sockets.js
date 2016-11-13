export const socket = io.connect();

export function order(req) {
        socket.emit("order", req);
}