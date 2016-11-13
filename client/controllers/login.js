import $ from "jquery";
import { login, socket } from "./../sockets";
import { navigate } from "./../navigate";

export function create() {
        socket.on("login", auth => {
                if (auth.status === "success") {
                        navigate("home");
                }
        })
};

export function destroy() {
        socket.off("login");
}


