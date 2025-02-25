# Deprivation and Education Tracker

## Project Overview

The Deprivation and Education Tracker application provides insights into education levels for specific Lower Layer Super Output Areas (LSOAs) in England, alongside their Index of Multiple Deprivation (IMD) Decile. Users can interact with the application to explore and compare data either by selecting individual LSOAs or by choosing a particular IMD Decile.

## Core Features

* View education data for specific LSOAs or IMD deciles.
* Compare individual LSOA data with averages across the chosen decile.
* Interactive map to select LSOAs visually.
* Filterable LSOA list for easy navigation.
* Dynamic data visualisation using graphs and maps.

## Technology Stack
### Backend

* Node.js and Express: Used to create the backend server and RESTful API.
* MySQL: Database for storing LSOA and education data.
* Sequelise: An Object-Relational Mapper (ORM) for managing and querying the MySQL database.
* Inversify and Reflect-metadata: Used to implement dependency injection, enhancing the scalability and maintainability of the MVC structure.

## Frontend

* d3.js: JavaScript library for creating interactive data visualizations in the browser.
* Leaflet: Mapping library used to display LSOAs on an interactive map.
* GeoJSON: Format for representing geographical data, integrated into the map with Leaflet for visualising LSOA boundaries.

## How to Use the Application

* Input a Known LSOA Code: Enter an LSOA code into the input field to view its corresponding education data. A graph will display the education levels for that LSOA.
* Compare with IMD Decile Mean: Users can compare the selected LSOA's education data with the average for all LSOAs within the same IMD decile.
* Map Interaction: Zoom and pan on the interactive map to find and select LSOAs visually. The map displays the LSOAs and their corresponding data.
* Filterable LSOA List: Alternatively, users can type into the search field to filter the list of LSOAs and select one from the list.
* View Decile Data: Select a decile to view the mean education data for all LSOAs within that IMD decile. This feature allows users to make general statements about education levels in various socio-economic contexts.

## Deployed Application

You can access the live version of the Deprivation and Education Tracker here:
[Deprivation and Education Tracker - Live Application](https://cscloud8-85.lnu.se/wt2/)

## Additional Features

* Optimised Data Loading: Data is fetched on demand, reducing unnecessary database queries. Pagination is used to handle large datasets efficiently, ensuring only the necessary data is loaded into the DOM.
* Backend Data Processing: Most data manipulation is handled on the backend, improving performance and scalability.
* Potential Enhancements: The performance could be further improved by integrating ElasticSearch and indexing for faster data retrieval.

## Future Improvements

While the current system is efficient in handling large datasets and providing interactive visualisation, additional features such as ElasticSearch integration could significantly improve search speed and responsiveness, especially when handling large datasets.

The core focus of data manipulation remains on the backend using MySQL and Sequelize, ensuring a smooth and responsive experience on the frontend with d3.js visualisations and Leaflet-powered mapping.