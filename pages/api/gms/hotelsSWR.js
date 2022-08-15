import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useHotelDB(){
  const { data, error } = useSWR(`/api/gms/fetchHotelDb`, fetcher, { refreshInterval: 1000 })
  return {
    HotelEntries: data,
    loadingStat: !error && !data,
    errorStat: error
  }
}