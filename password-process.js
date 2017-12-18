#!/usr/bin/env node

const fs = require('fs')
const url = require('url')
const child_process = require('child_process')

const passwords = JSON.parse(fs.readFileSync('passwords', 'utf8'))

for (let p of passwords) {
	
	const { password, loginPair: { username, urls: { origin } } } = p;
	const u = url.parse(origin);

	const domain = u.hostname;

	const contents = `${password}
username: ${username}
domain: ${domain}
`;

	const process = child_process.exec(`pass insert --multiline "${domain}/${username}"`);
	process.stdin.write(contents);
	process.stdin.end();

	console.log(contents);
}

