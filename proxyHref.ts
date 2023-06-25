/**
 * An alternative to href that redirects the url under a proxy if the site is blocked
 * @param - The url to redirect to
 * @param - The prefix from where the proxy url's are handled
 */
export default (url: string, prefix: string) => {
	const img = document.createElement("img");

	img.onload = () => url;
	img.onerror = () => location.origin + prefix + url;

	img.src = new URL(url).origin + "/favicon.ico";

	document.body.appendChild(img);
};
