# Freedom Spoke

> Freedom Spoke is a flight platform that lets you search multiple destinations at once and compare results from Google's API (which also sources Expedia, Orbitz, etc.) to those from Skiplagged. Skiplagged is a hidden-city search engine that checks to see if a person's intended destination is a connecting city for some cheaper flight available.

> Freedom Spoke gives users maximum visibility into all flight prices: https://freedom-spoke.herokuapp.com/.

## Team

  - __Product Owner__: Eric Fischer


•	The app is built in AngularJS, drawing data from Google’s QPX flight API and deep-linking to Skiplagged
•	Currently communicating with the developer of Skiplagged to complete his API, a Node.js wrapper deployed on NPM
•	The backend is architected with Node.js and Express middleware, and MongoDB is used for storing user data
•	Python scripts and MySQL commands were applied to CSV files to produce detailed airport maps with app CartoDB
