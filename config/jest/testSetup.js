const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() });

global.IntersectionObserver = jest.fn((callback, options) => ({
	observe: () => { },
	unobserve: () => { },
	takeRecords: () => { },
	disconnect: () => {}
}))

global.requestAnimationFrame = (cb) => {
	setTimeout(cb, 0)
}

global.cancelAnimationFrame = (id) => {
	clearTimeout(id)
}