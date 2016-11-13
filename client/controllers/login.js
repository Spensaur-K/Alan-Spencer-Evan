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

        socket.on("signup", auth => {
                loading.off();
                if (auth.status === "success") {
                        navigate("home", auth);
                } else {
                        navigate("login", auth);
                }
        });
        $(".button.signup").click(e => {
                loading.on();
                socket.emit("signup", {
                        username: $("#username").val(),
                        password: $("#password").val(),
                        first: $("#first_name").val(),
                        last: $("#last_name").val()
                });
        });
};

export function destroy() {
        socket.off("login");
}


