import $ from "jquery";

const viewLoader = require.context("./views"),
	  pageElement = $("#page");

export function navigate(path) {
	pageElement.html(viewLoader(`./${path}`, {}));
}