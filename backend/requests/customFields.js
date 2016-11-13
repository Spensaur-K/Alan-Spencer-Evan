module.exports = function(field, arr) {
        for (const fieldObj of arr) {
                if (fieldObj.name == field)
                        return fieldObj.value;
        }
}