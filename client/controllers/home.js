import $ from "jquery";
import { order } from "./../sockets";

module.exports = () => {
        $(".buy.button").click(e => {
                order();
        });
};