export default class {
	static swSupported = false;

	/**
	 * Manage many proxies safely
	 * @constructor
	 * @param {boolean} [cache=true] Cache the proxy; disabling this may slow down the proxy
	 */
	constructor(cache = true) {
		if (!this.swSupported)
			!("serviceWorker" in navigator)
				? console.error("Proxies are not supported on your browser")
				: (this.swSupported = true);
	}
	/**
	 * Spawn a new proxy
	 * @param {string} - The path to the service worker
	 * @param {string} - The prefix where the proxy url's are handled
	 * @param {boolean} [legacy=true] Do not register as a module script
	 */
	add(path, prefix, legacy = true) {
		if (!this.swSupported) return;

		navigator.serviceWorker
			.register(path, {
				scope: prefix,
				type: legacy ? "classic" : "module",
				// Don't cache http requests
				updateViaCache: this.cache ? "all" : "none"
			})
			// Update the service worker
			.then(reg => reg.update());
	}
	/**
	 * Update the config
	 * @param {string} - The identifier used in the message handler
	 * @param {object} - The new config
	 */
	update(id, config) {
		if (!this.swSupported) return;

		if (typeof object !== "object") {
			console.error(`Tried to update invalid config for ${dbName}`);
			return;
		}

		navigator.serviceWorker.controller.postMessage({
			id: id,
			...config
		});
	}
}
