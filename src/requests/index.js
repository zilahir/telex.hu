import axios from 'axios'

export const cloudFnRequest = (method, path, parameters, data) => Promise.resolve({
	baseURL: path,
	method,
	path,
	data,
	params: parameters,
})
	.then()
	.then(axios)

export const cloudFnGet = (path, parameters, options?) => cloudFnRequest('get', path, parameters, undefined, options)

export const cloudFnPost = (path, data, options?) => cloudFnRequest('post', path, undefined, data, options)

export const cloudFnPatch = (path, data, options?) => cloudFnRequest('patch', path, undefined, data, options)

export const cloudFnDelete = (path, parameters, options?) => cloudFnRequest('delete', path, parameters, undefined, options)
