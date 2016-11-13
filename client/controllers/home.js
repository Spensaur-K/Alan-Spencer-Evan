import $ from "jquery";
import { order, socket } from "./../sockets";

export function create() {
        socket.on("jobcreate", (jid) => {
                $(".feedback").append(`Job with id ${jid} created successfully`);
        })
        socket.on("pickup", jid => {
                $(".feedback").append(`Job with id ${jid} was just picked up`);
        });
        //clc location
        $(".buy.button").click(e => {


               if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position){
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


