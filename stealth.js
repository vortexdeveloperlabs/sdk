/**
 * @param {string} - A reference to the window
 * @param {string} - The url for the iframe
 */
function setUrl(win, url) {
	win.document.body.innerHTML = `
<!DOCTYPE html>
<html lang="en">
	<body>
		<style>
			body {
				margin: 0;
			}
			iframe {
				display: block;

				height: 100vh;
				width: 100vw;

				border: none;
			}
		</style>

		<iframe src="${url}"></iframe>
	</body>
</html>`;
}

/**
 * A library that creates a popup protected from extension-based spyware, which also hides your browsing history
 * @param {string} - The url to hide
 */
export default url => {
	const win = window.open("about:blank");

	win.addEventListener("load", () => setUrl(win, url));
};
