import axios from 'axios';
import { SearchType } from '../types';
import { z } from 'zod';
import { useMemo, useState } from 'react';


//Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

export type Weather = z.infer<typeof Weather>

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather() {

    const [weather, setWeather] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)


    const fetchWeather = async (search: SearchType) => {

        const appID = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        setNotFound(false)

        try {
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`

            const { data } = await axios.get(geoURL)

            if(!data[0]){
                setNotFound(true)
                return
            }
            
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`

            const { data: weatherResult } = await axios.get(weatherURL)

            const result = Weather.safeParse(weatherResult)

            if (result.success) {
                setWeather(result.data)
            }


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }


}
