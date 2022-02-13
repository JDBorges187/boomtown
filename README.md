# Boomtown Technical Assessment

## Install
* To install this project clone it to your local drive and run ```npm install```

## Access Github API
The goal with this application was to hit Github API to request data such as repos, events and members and display to the user in a meaningful way.
To accomplish this I used React on the frontend with Bootstrap as a CSS library. Elements chosen were tables and cards. See [wireframe](https://docs.google.com/document/d/1lRfMEIXbWfaUZSfy5q-uctFquSDW1sPxr-L6cbie-as/edit?usp=sharing) for more details.

## Repos
Generate a list of Repos by the organization and display it as a table


## Events
Generate a list of Events by the organization and display it as a table


## Hooks and Issues
Requesting hooks and issues produces a 404 error. Handle the error and display a warning to user.

## Verifications
* Verify created_at date is before or equal to updated_at date
* Verify number of repos 

## Future additions
> Given more time I would implement the following improvements
* Pagination of Repos and Events 
* useContext or Redux to manage state of repos and events to minimize calls to API
* Add a form submission for generating this page with different organizations
