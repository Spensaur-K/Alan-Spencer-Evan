// creates a generic middleware for a simple GET json request using a keystone list

const keystone = require("keystone");

module.exports = function (listName) {
    const List = keystone.list(listName),
          refs = [];
    
    for (const field of Object.keys(List.fields)) {
        if (List.fields[field].type === "relationship") {
            refs.push(field);
        }
    }

    return function(req, res) {
        let query = List.model.find();

        if (refs.length) {
            query = query.populate(refs.join(" "));
        }

        query.exec().then(data => {
            debugger;
        });
    };
};