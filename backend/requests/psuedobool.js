module.exports = function(prop) {
        return prop == "true" || (typeof prop === "boolean" && prop);
}