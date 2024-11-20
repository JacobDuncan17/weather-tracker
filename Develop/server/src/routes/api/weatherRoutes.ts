import { Router, type Request, type Response } from 'express';
const router = Router();

import WeatherService from '../../service/weatherService.js';

// Define an interface for the body of the POST request to specify that "city" is a string
interface WeatherRequestBody {
  city: string;
}

// POST Request to retrieve weather data for a city
router.post('/', async (req: Request<{}, {}, WeatherRequestBody>, res: Response) => {
  const { city } = req.body;  // Extract the city name from the request body

  if (!city) {
    // Return early if the city is not provided
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Get weather data for the city
    const weatherData = await WeatherService.getWeatherForCity(city);

    // Check if weather data was successfully retrieved
    if (!weatherData || Object.keys(weatherData).length === 0) {
      // Return early if no weather data was found
      return res.status(404).json({ error: 'Weather data not found' });
    }

    // Return the weather data in the response
    return res.status(200).json(weatherData);

    // TODO: Save the city to search history (e.g., save to DB or in-memory storage)

  } catch (err) {
    console.error('ERROR:', err);  // Log the error with more detailed information
    return res.status(500).json({ error: 'Internal Server Error', details: err });
  }
});

// TODO: Implement GET search history (retrieve list of searched cities)
// router.get('/history', async (req: Request, res: Response) => {

// });

// TODO: Implement DELETE request to remove a city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {

export default router;