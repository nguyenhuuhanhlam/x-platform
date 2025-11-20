import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_ENDPOINT })

export const employees_api = (base = '/employees') => ({
	get_active_list: async () => await api.get(`${base}/is-active`),
	get_one: async (id) => await api.get(`${base}/${id}`),
})

