import $ from "jquery";
import { order, socket } from "./../sockets";
import loading from "./../loading";

export function create() {
        $("#creme").val(100/7)
        $("#sugar").val(100/7)

        $("#creme-display").height(($("#creme").val()/100)*900);
        $("#creme").on("input", e => {
                $("#creme-display").height(($("#creme").val()/100)*900)
        });
        $("#sugar-display").height(($("#sugar").val()/100)*900);
        $("#sugar").on("input", e => {
                $("#sugar-display").height(($("#sugar").val()/100)*900)
        });
        socket.on("jobcreate", (jid) => {
                loading.off();
                $(".feedback").append(`<div>Job with id ${jid} created successfully</div>`);
        })
        socket.on("pickup", jid => {
                $(".feedback").append(`<div>Job with id ${jid} was just picked up</div>`);
        });
        socket.on("delivery", jid => {
                $(".feedback").append(`<div>Job with id ${jid} was just delivered to you, look up from your phone</div>`);
        });
        //clc location
        $(".buy.button").click(e => {
                if (confirm("Confirm Order?")) {
                        loading.on();
                        if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(function (position) {
                                        var lat = position.coords.latitude;
                                        var long = position.coords.longitude;

                                        order({
                                                type: `${$("#coffee").val()} coffee with ${($("#creme").val()/100)*7} creme and ${($("#sugar").val()/100)*7} sugar`,
                                                from: $("#shop").val(),
                                                lat: lat,
                                                long: long
                                        });

                                });
                        } else {
                                // "Geolocation is not supported by this browser.";
                                order({
                                        type: $("#coffee").val(),
                                        from: $("#shop").val(),
                                        lat: 9001,
                                        long: 9001
                                });
                        }
                }

        });
};

export function destroy() {
        socket.off("pickup");
        socket.off("jobcreate");
}


