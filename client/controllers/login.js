import $ from "jquery";
import { login, socket } from "./../sockets";
import { navigate } from "./../navigate";

window.n = navigate;

export function create() {
        socket.on("login", auth => {
                if (auth.status === "success") {
                        navigate("home", auth);
                }
        });
        $(".button.login").click(e => {
                login(
                    $("#username").val(),
                    $("#password").val()
                )});
};

export function destroy() {
        socket.off("login");
}


