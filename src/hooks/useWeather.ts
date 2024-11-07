import axios from 'axios';
import { SearchType } from '../types';
import { z } from 'zod';


//Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

type Weather = z.infer<typeof Weather>



export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {

        try {

            const appID = import.meta.env.VITE_API_KEY

            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`

            const { data } = await axios.get(geoURL)

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`

            //const {data: weatherResult} = await axios.get<WeatherType>(weatherURL)
            //console.log(weatherResult)

            const {data: weatherResult} = await axios.get(weatherURL)

            const result = Weather.safeParse(weatherResult)

            console.log(result)


        } catch (error) {
            console.log(error)
        }

    }

    return {
        fetchWeather
    }


}
