import $ from "jquery";
import all from "./../items.json";

const viewLoader = require.context("./views"),
	  controllerLoader = require.context("./controllers"),
	  pageElement = $("#page");

let currentView = null;

export function navigate(path, ctx = {}) {
	const file = `./${path}`;
	let template = viewLoader(file+".hbs");
	if (typeof template === "function") {
		template = template(Object.assign(ctx, all));
	}
	pageElement.html(template);
	if (currentView !== null) {
		controllerLoader(`./${currentView}`).destroy();
	}
	controllerLoader(file).create(ctx);
	currentView = path;
}


window.n = navigate;
window.j = $;

export function refresh(path, ctx = {}) {
	navigate(path, ctx);
}