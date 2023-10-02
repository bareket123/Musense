# Musense 🎶
music app
<h3> Description</h3>
<div>
  An advanced application that allows users to enjoy a personal, unique, and social music listening experience. 
  Our application connects users with music through a variety of services and advanced capabilities, enabling them to explore, discover, and create the perfect listening experience for themselves.
</div>
<h3> Tech</h3>

**Client:** React Native <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/>  , Redux <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/>, Expo cil
<img src="https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s" width="40" height="40"/>

**Server:** Java <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/>, Spring Boot <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring" width="40" height="40"/>,Hibernate
<img src="https://cdn.freebiesupply.com/logos/large/2x/hibernate-logo-png-transparent.png" width="40" height="40"/>

## Key Features

- Access a curated selection of the most popular songs.
- Seamlessly create and manage personalized playlists.
- Receive song recommendations tailored to your music preferences.
- Establish connections with friends and discover playlists based on their preferences.
- Effortlessly search for songs and artists within the application.


## API Reference

we have used RapidAPI web to get the songs data.
in RapidAPI we choose to use Shazam- [shazam Api](https://rapidapi.com/apidojo/api/shazam)

**example**
#### Get popular tracks
get a list of songs that are popular now

```http
  GET  https://shazam.p.rapidapi.com/charts/track
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `X-RapidAPI-Key` | `string` | **Required**. Your API key |
|`X-RapidAPI-Host`|`string`|**Required**.Your host url|
|`locale`|`string`|**OPTIONAL** The language code|
|`pageSize`|`string`|**OPTIONAL** items number|
|`pageSize`|`string`|**OPTIONAL** Used for paging purpose|
## Installation

Install my-project with npm

**Server-side:**

 go to [Musense Server](https://github.com/bareket123/Musense-server) download and run the server  

 **Client-side:**
 
 run npm install 
 
 run npm start
 
 download the Expo app and scan the QR code 
 ## Logo
 ![Logo](https://github.com/bareket123/Musense/assets/80274935/e2959dc2-4bd0-47b7-af32-41e848eb9723)
 
## Demo


https://github.com/bareket123/Musense/assets/80274935/705d0418-052b-410e-bf9d-c31b79d211bd






 
