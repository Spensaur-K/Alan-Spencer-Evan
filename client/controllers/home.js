import $ from "jquery";
import { order, socket } from "./../sockets";
import loading from "./../loading";

export function create() {
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
                loading.on();
                if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                                var lat = position.coords.latitude;
                                var long = position.coords.longitude;

                                order({
                                        type: $("#coffee").val(),
                                        from: $("#shop").val(),
                                        lat: lat,
                                        long: long
                                });

                        });
                } else {
                        // "Geolocation is not supported by this browser.";
                        var lat = 0;
                        var long = 0;
                        order({
                                type: "coffee",
                                from: "somehwere (timmies)",
                                lat: lat,
                                long: long
                        });

                }

        });
};

export function destroy() {
        socket.off("pickup");
        socket.off("jobcreate");
}


