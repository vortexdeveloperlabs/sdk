import createBareClient from "@tomphttp/bare-client";
import type BareClient from "@tomphttp/bare-client";

export default class {
	proxyFetch: BareClient;
	ss: boolean;

	/**
	 * A library that lets you get the url to redirect to and the search suggestions for various search engines
	 * @constructor
	 * @param - The proxy backend's api route
	 * @param - Enable safesearch
	 */
	constructor(backends: string[], ss = false) {
		this.proxyFetch = new createBareClient(location.origin + backends[0]);
		this.ss = ss;
	}
	async getEntries(resp: Response): string[] {
		const data = await resp.text();

		try {
			return JSON.parse(data)[1];
		} catch {
			return [];
		}
	}
	google = {
		url: () => "https://www.google.com/search?q=",
		ac: async (query: string) => {
			const resp = await this.proxyFetch.fetch(
				`https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=${query}`
			);

			const parser = new DOMParser();

			const body = await resp.text();

			const xml = parser.parseFromString(body, "application/xml");

			return [...xml.getElementsByTagName("suggestion")].map(element =>
				element.getAttribute("data")
			);
		},
	};
	brave = {
		url: () => "https://search.brave.com/search?q=",
		ac: async (query: string) => {
			const resp = await this.proxyFetch.fetch(
				`https://search.brave.com/api/suggest?q=${query}&rich=false&source=web`
			);

			return await this.getEntries(resp);
		},
	};
	ddg = {
		url: () => `https://duckduckgo.com/?q=${this.ss ? "&kp=1" : ""}`,
		ac: async (query: string) => {
			const resp = await this.proxyFetch.fetch(
				`https://duckduckgo.com/ac/?q=${query}&type=list`
			);

			return await this.getEntries(resp);
		},
	};
	qwant = {
		url: () => "https://www.qwant.com/?q=",
		ac: async (query: string) => {
			const resp = await this.proxyFetch.fetch(
				`https://api.qwant.com/api/suggest/?client=opensearch&q=${query}`
			);

			return await this.getEntries(resp);
		},
	};
}
