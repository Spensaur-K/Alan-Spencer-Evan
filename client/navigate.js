import $ from "jquery";

const viewLoader = require.context("./views"),
	  controllerLoader = require.context("./controllers"),
	  pageElement = $("#page");

export function navigate(path, ctx = {}) {
	const file = `./${path}`;
	pageElement.html(viewLoader(file), ctx);
	controllerLoader(file).create(ctx);
}