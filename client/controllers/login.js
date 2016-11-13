import $ from "jquery";
import { login, socket } from "./../sockets";
import { navigate } from "./../navigate";
import loading from "./../loading";


export function create() {
        socket.on("login", auth => {
                loading.off();
                if (auth.status === "success") {
                        navigate("home", auth);
                } else {
                        navigate("login", auth);
                }
        });
        $(".button.login").click(e => {
                loading.on();
                login(
                    $("#username").val(),
                    $("#password").val()
                );
        });
};

export function destroy() {
        socket.off("login");
}


