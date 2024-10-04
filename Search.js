export default class {
	/**
	 * A library that lets you get the url to redirect to and the search suggestions for various search engines
	 * @constructor
	 * @param {boolean} - Enable safesearch
	 */
	constructor(ss = false) {
		this.ss = ss;
	}
	async getEntries(resp) {
		const data = await resp.text();

		try {
			return JSON.parse(data)[1];
		} catch {
			return [];
		}
	}
	google = {
		url: () => "https://www.google.com/search?q=",
		ac: async query => {
			const resp = await new BareMux.BareClient().fetch(
				`https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=${query}`
			);

			const parser = new DOMParser();

			const body = await resp.text();

			const xml = parser.parseFromString(body, "application/xml");

			return [...xml.getElementsByTagName("suggestion")].map(element =>
				element.getAttribute("data")
			);
		}
	};
	brave = {
		url: () => "https://search.brave.com/search?q=",
		ac: async query => {
			const resp = await new BareMux.BareClient().fetch(
				`https://search.brave.com/api/suggest?q=${query}&rich=false&source=web`
			);

			return await getEntries(resp);
		}
	};
	ddg = {
		url: () => `https://duckduckgo.com/?q=${this.ss ? "&kp=1" : ""}`,
		ac: async query => {
			const resp = await new BareMux.BareClient().fetch(
				`https://duckduckgo.com/ac/?q=${query}&type=list`
			);

			return await getEntries(resp);
		}
	};
	qwant = {
		url: () => "https://www.qwant.com/?q=",
		ac: async query => {
			const resp = await new BareMux.BareClient().fetch(
				`https://api.qwant.com/api/suggest/?client=opensearch&q=${query}`
			);

			return await getEntries(resp);
		}
	};
}
