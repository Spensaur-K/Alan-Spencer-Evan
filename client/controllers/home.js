import $ from "jquery";
import { order } from "./../sockets";

module.exports = () => {

        //clc location
        $(".buy.button").click(e => {
                order({
                        type: "coffee",
                        from: "somehwere (timmies)"
                });
        });
};