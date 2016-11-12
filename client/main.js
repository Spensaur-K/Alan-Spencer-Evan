import { navigate } from "./navigate";

require.context("./style");

"use strict";

navigate("home");

console.log("hello word");

class HelloWorld {
    main() {
        console.log("hello world");
    }
}