import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_ENDPOINT })

export const employees_api = (base = '/employees') => ({
	get_active_list: async () => await api.get(`${base}/is-active`),
	get_one: async (id) => await api.get(`${base}/${id}`),

	get_personal: async (id) => await api.get(`/personal/${id}`),
	get_families: async (id) => await api.get(`/families/${id}`)
})

export const cfm_api = (base = '/cfm') => ({
	get_spa_cons: async () => await api.get(`${base}/spa-cons`),
	get_con_projects: async () => await api.get(`${base}/con/projects`),
	get_detail_con_project: async (project_id) => await api.get(`/cfm/con/project/${project_id}`)
})

export const minio_api = (base = '/minio') => ({
	get_presigned: async (employee_id, filename) => {
		const res = await api.get(`${base}/presigned-url/docs/${employee_id}/${filename}`)
		return res.data
	},
	uploadFile: async (employee_id, file, params) => {
		return await api.post(`${base}/upload/docs/${employee_id}`, file, params)
	}
})