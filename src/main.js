var view = require('./view')
var scene = require('./scene')

require('./resources').load(function () {
	view.init({z: 15.5})
	scene.init()
	view.render()
})
