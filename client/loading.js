import $ from "jquery";

export default {
        off() {
                $("#loading").css("display", "none");
        },
        on() {
                $("#loading").css("display", "block");
        }
}