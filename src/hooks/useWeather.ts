import axios from 'axios';
import { SearchType } from '../types';


export default function useWeather() {

    const fetchWeather = async (search: SearchType)=>{
        
        try {

            const appID = `08b2460f271fe415587ee206255d8e06`

            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`
            
            const data = await axios.get(geoURL)
            console.log(data)

        } catch (error) {
            console.log(error)
        }

    }

  return {
    fetchWeather
  }
   
  
}
