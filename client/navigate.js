import $ from "jquery";

const viewLoader = require.context("./views"),
	  controllerLoader = require.context("./controllers"),
	  pageElement = $("#page");

let currentView = null;

export function navigate(path, ctx = {}) {
	const file = `./${path}`;
	pageElement.html(viewLoader(file), ctx);
	if (currentView !== null) {
		controllerLoader(currentView).destroy();
	}
	controllerLoader(file).create(ctx);
	currentView = path;
}