var config = require('./')

module.exports = {
	source: config.sourcePath+'pug/**/*.pug',
	dest: config.buildPath,
	jadeInheritance: {
		"basedir": config.sourcePath+'pug/'
	}
}
