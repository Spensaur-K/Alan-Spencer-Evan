import $ from "jquery";
import { login, socket } from "./../sockets";
import { navigate } from "./../navigate";

export function create() {
        socket.on("login", auth => {
                if (auth.status === "success") {
                        navigate("home", auth);
                } else {
                        navigate("login", auth);
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


