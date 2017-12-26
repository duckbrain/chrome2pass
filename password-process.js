#!/usr/bin/env node

const fs = require('fs')
const url = require('url')
const child_process = require('child_process')

const passwords = JSON.parse(fs.readFileSync('passwords.json', 'utf8'))

for (let p of passwords) {
	
	const { password, loginPair: { username, urls: { origin } } } = p;
	const u = url.parse(origin);

	let domain = u.hostname;
	if (domain.indexOf('www.') === 0) {
		domain = domain.substring(4);
	}

	const contents = `${password}
username: ${username}
domain: ${domain}
`;

	const process = child_process.exec(`pass insert --multiline "${domain}/${username}"`);
	process.stdin.write(contents);
	process.stdin.end();

	console.log(contents);
}

