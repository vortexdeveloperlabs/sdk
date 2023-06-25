class ProxyManager {
	static swSupported = false;

	cache: boolean;

	/**
	 * Manage many proxies safely
	 * @constructor
	 * @param - Cache the proxy; disabling this may slow down the proxy
	 */
	constructor(cache = true) {
		this.cache = cache;
		if (!ProxyManager.swSupported)
			!("serviceWorker" in navigator)
				? console.error("Proxies are not supported on your browser")
				: (ProxyManager.swSupported = true);
	}
	/**
	 * Spawn a new proxy
	 * @param - The path to the service worker
	 * @param - The prefix where the proxy url's are handled
	 * @param - Do not register as a module script
	 */
	add(path: string, prefix: string, legacy = true) {
		if (!ProxyManager.swSupported) return;

		navigator.serviceWorker
			.register(path, {
				scope: prefix,
				type: legacy ? "classic" : "module",
				// Don't cache http requests
				updateViaCache: this.cache ? "all" : "none",
			})
			// Update the service worker
			.then(reg => reg.update())
			.catch(err => console.error(err.stack));
	}
	/**
	 * Update the config
	 * @param - The identifier used in the message handler
	 * @param - The new config
	 */
	update(id: string, config: object) {
		if (!ProxyManager.swSupported) return;

		if (typeof config !== "object") {
			//console.error(`Tried to update invalid config for ${dbName}`);
			return;
		}

		if (navigator.serviceWorker.controller)
			navigator.serviceWorker.controller.postMessage({
				id: id,
				...config,
			});
	}
}

export default ProxyManager;
