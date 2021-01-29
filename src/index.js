const core = require('@actions/core')
const github = require('@actions/github')

const {
	GITHUB_TOKEN
} = require('./config')

const run = async () => {
	const client = new github.GitHub(GITHUB_TOKEN)
	const { data } = await client.users.getAuthenticated()
	core.info(`Token user: ${ data.login }`)
}

run()
	.then(() => {})
	.catch((err) => {
		core.error('ERROR', err)
		core.setFailed(err.message)
	})