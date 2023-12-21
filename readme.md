# Roc8 Task:  
## Problem Statement: Interactive Data Visualization Dashboard
#### Background:
Imagine you are working on a project to build a product analytics platform for your company. The platform provides users with real-time data on sales, user engagement, etc. Your task is to develop a front-end application that includes interactive data visualization charts, advanced filtering options, and efficient cookie management for user preferences.

Additionally, the user will be sharing a view of the page with specific filters enabled and dates selected through the browser URL. Other users can then access the shared view by simply visiting this URL upon authentication.
#### Requirements:
##### Interactive Data Visualization:
* Build a bar chart to represent the Features. A,B,C.. are features and x axis is total time spent between the selected date range.
* Implement a line chart to display the time trend of a particular category upon clicking in the bar chart. Chart should have pan, zoom-in, zoom-out options on time range.

[![Screenshot-from-2023-12-21-14-21-51.png](https://i.postimg.cc/7ZVkWtsV/Screenshot-from-2023-12-21-14-21-51.png)](https://postimg.cc/PCP9Lykp)

##### Advanced Filtering:
* Include 2 filters: Age (15-25, >25), Age (male, female). 
* Add a date range selector component that allows users to choose a specific time range for analytics data. Update the graph based on the selected time range and filters.

[![Screenshot-from-2023-12-21-14-22-11.png](https://i.postimg.cc/cHGBtTWp/Screenshot-from-2023-12-21-14-22-11.png)](https://postimg.cc/bGLtKxsg)

The dataset is given below. You have to create an API Integration layer and Data Pipeline. You may create an API from the framework of your choice or import the data somehow to your API Integration layer. Here your data pipeline building skill will be evaluated not API building skill.

###### Frontend Developer Assignment Data https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0

##### Cookie Management:
Implement a cookie management system to store user preferences of filters and date range. When users revisit the page, their previous settings are applied by retrieving data from cookies. Provide an option for users to reset or clear their preferences.

##### Responsiveness:
Ensure that the frontend application is responsive and works seamlessly on various devices, including desktops, tablets, and mobiles.

##### User Authentication:
Implement a basic user login interface. Users should be able to sign up, log in, and log out.

##### URL Sharing:
Users should be able to share a chart created with date range and filters to another user via a URL. The second user will have to log in first to view the chart because the data is confidential.
