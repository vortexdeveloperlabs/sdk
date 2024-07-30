import { prefix } from "/aero/config.js";

/**
 * An alternative to href that redirects the url under a proxy if the site is blocked
 * @param {string} - The url to redirect to
 * @param {string} - The prefix where the proxy url's are handled
 */
export default (url, $prefix = prefix) => {
	const img = document.createElement("img");

	img.onload = () => url;
	img.onerror = () => location.origin + $prefix + url;

	img.src = `${new URL(url).origin}/favicon.ico`;

	document.body.appendChild(img);
};
