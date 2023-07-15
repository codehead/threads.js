const { fetch } = require('undici');

class RESTManager {
	constructor(client) {
		Object.defineProperty(this, 'client', { value: client });
	}

	async request(url, options) {
		if (!options) {
			options = {};
		};
		options.method = options?.method ?? 'GET';
		options.headers = {
			'Authorization': `Bearer IGT:2:${this.client.options.token}`,
			'User-Agent': this.client.options.userAgent,
			'Sec-Fetch-Site': 'same-origin',
		};
		if (options.method === 'POST') {
			options.headers = {
				...options.headers,
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			};
		};
		const res = await fetch(this.client.options.base + url, { ... options });
		const contentType = res.headers.get('content-type');
		if (contentType.includes('application/json')) {
			return res.json();
		}
		return res.text();
	}
}

module.exports = RESTManager;