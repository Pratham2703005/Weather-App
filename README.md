**Weather App**

**Overview**
The Weather App provides current weather information based on the user's location or a searched city. It utilizes the OpenWeatherMap API to fetch weather data and displays it in an intuitive and user-friendly interface.

**Features**
- User Location Weather: Automatically fetches and displays weather data based on the user's geolocation.
- City Search Weather: Allows users to search for weather information by city name.
- Dynamic UI: Displays weather details including temperature, humidity, wind speed, and cloudiness.
- Error Handling: Shows appropriate messages for errors such as city not found or geolocation issues.
- Session Storage: Saves user's location coordinates in the session storage for faster access on return visits.

**How It Works**
- HTML Structure:
- The HTML file sets up the basic structure of the app including the title, tabs for switching between user location and search, and containers for weather data and errors.
- The favicon and CSS styles are linked in the head section.
- The body contains the main elements of the app: a title, tabs, weather data containers, and error messages.

2.CSS Styling:
- The app uses a custom font from Google Fonts.
- The .wrapper class centers the content and applies basic styling.
- Specific styles are applied to elements such as tabs, buttons, and weather data containers.

3.JavaScript Functionality:
- Tab Switching: Handles switching between user location weather and search weather tabs.
- Geolocation Access: Prompts the user to grant location access and fetches weather data based on coordinates.
- Search Functionality: Allows users to enter a city name and fetches weather data for the searched city.
- Weather Data Fetching: Makes API calls to OpenWeatherMap to fetch weather data based on coordinates or city name.
- Error Handling: Displays error messages for various issues such as denied location access or city not found.
Rendering Data: Updates the UI with fetched weather data including city name, country flag, weather description, temperature, wind speed, humidity, and cloudiness.
