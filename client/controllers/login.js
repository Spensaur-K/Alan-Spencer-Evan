import $ from "jquery";
import { login, socket } from "./../sockets";
import { navigate } from "./../navigate";

window.n = navigate;

export function create() {
        socket.on("login", auth => {
                if (auth.status === "success") {
                        navigate("home", auth);
                }
        })
};

export function destroy() {
        socket.off("login");
}


