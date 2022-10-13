import axios from 'axios'

const META_URL = 'https://sandconsole.hubblerapp.com/testrest/zac/'
const REPORTS_URL = 'https://sandconsole.hubblerapp.com/testrest/srinivas/'

export const getMetaDataApiCall = () => axios.get(META_URL);

export const getReportsApiCall = () => axios.get(REPORTS_URL)

export const deleteReportApiCall = id => axios.delete(REPORTS_URL, {data: {_id: id}})

export const postReportApiCall = payload => axios.post(REPORTS_URL, payload)

export const updateReportAPiCall = payload => axios.patch(`${REPORTS_URL}${payload._id}/` ,payload)
