import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_ENDPOINT })

export const hrm_api = (base = '/hrm') => ({
	get_active_list: async () => await api.get(`${base}/employees/is-active`),
	get_one: async (id) => await api.get(`${base}/employees/${id}`),

	get_personal: async (id) => await api.get(`${base}/personal/${id}`),
	get_families: async (id) => await api.get(`${base}/families/${id}`),
	get_provinces: async () => await api.get(`${base}/provinces/`),

	get_workinfos_by_employee: async (employee_id) => await api.get(`${base}/workinfos/by-employee/${employee_id}`),
	get_contracts: async (employee_id) => await api.get(`${base}/contracts/${employee_id}`),
	get_latest_contract: async (employee_id) => await api.get(`${base}/contracts/latest/${employee_id}`),

	get_pit_deduction: async (employee_id) => await api.get(`${base}/salaries/pit-deduction/${employee_id}`),
})

export const cfm_api = (base = '/cfm') => ({
	get_spa_cons: async () => await api.get(`${base}/spa/cons`),
	get_con_projects: async () => await api.get(`${base}/con/projects`),
	get_con_project_details: async (project_id) => await api.get(`${base}/con/project/details/${project_id}`),
	post_con_project: async (data) => await api.post(`${base}/con/project`, data),
	delete_con_project: async (project_id) => await api.delete(`${base}/con/project/${project_id}`),
	get_con_incomes: async (project_id) => await api.get(`${base}/con/incomes/${project_id}`),
	post_con_income: async (data) => await api.post(`${base}/con/income`, data),
	delete_con_income: async (income_id) => await api.delete(`${base}/con/income/${income_id}`),

	get_some_contacts: async (ids) => await api.post(`${base}/some-contacts`, ids)
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

export const bitrix_api = (base = '/bitrix') => ({
	auth: async (code, domain) => {
		return await api.post(`${base}/auth`, { code, domain })
	}
})