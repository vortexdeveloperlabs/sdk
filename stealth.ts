/**
 * @param - A reference to the window
 * @param - The url for the iframe
 */
function setUrl(win: Window, url: string) {
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
 * @param - The url to hide
 */
export default (url: string) => {
	const win = window.open("about:blank");

	if (win instanceof Window)
		win.addEventListener("load", () => setUrl(win, url));
};
