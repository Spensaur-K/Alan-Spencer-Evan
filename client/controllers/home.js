import $ from "jquery";
import { order } from "./../sockets";

module.exports = () => {

        //clc location
        $(".buy.button").click(e => {


               if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position){
                                var lat = position.coords.latitude;
                                var long = position.coords.longitude;

                                order({
                                        type: "coffee",
                                        from: "somehwere (timmies)",
                                        latitude: lat,
                                        longitude: long
                                });

                        });
                } else {
                        // "Geolocation is not supported by this browser.";
                        var lat = 0;
                        var long = 0;
                        order({
                                type: "coffee",
                                from: "somehwere (timmies)",
                                latitude: lat,
                                longitude: long
                                });

                }  

        });
};



