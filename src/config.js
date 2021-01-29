const core = require('@actions/core')

require('dotenv').config()

const getVar = ({ key, default: dft, required = false, type = 'string' }) => {
	const coreVar = Array.isArray(key) ? key.find((item) => core.getInput(item)) : core.getInput(key)
	const envVar = Array.isArray(key) ? key.find((item) => process.env[item]) : process.env[key]

	if (coreVar !== undefined && coreVar.length >= 1) {
		if (type === 'array') return coreVar.split('\n')

		return coreVar
	}

	if (envVar !== undefined && envVar.length >= 1) {
		if (type === 'array') return envVar.split(',')
		if (type === 'boolean') return envVar === 'true'

		return envVar
	}

	if (required === true)
		return core.setFailed(`Variable ${ key } missing.`)

	return dft

}

const context = {
	GITHUB_TOKEN: getVar({
		key: [ 'GH_PAT', 'GITHUB_TOKEN' ],
		required: true
	})
}

core.setSecret(context.GITHUB_TOKEN)

module.exports = context