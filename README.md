# EpicMail

[![Build Status](https://travis-ci.org/MCFrank16/epic-mail-v2.svg?branch=develop)](https://travis-ci.org/MCFrank16/epic-mail-v2)
[![Coverage Status](https://coveralls.io/repos/github/MCFrank16/epic-mail-v2/badge.svg?branch=develop)](https://coveralls.io/github/MCFrank16/epic-mail-v2?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/e95856b3295841c9681a/maintainability)](https://codeclimate.com/github/MCFrank16/epic-mail-v2/maintainability)

This is a messaging platform which let its user interact with each other. #AndelaChallenge

# Heroku Link: 
https://epik-mail-v2.herokuapp.com/api/v1/
# UI Link: 
https://mcfrank16.github.io/EpicMail/

### API Endpoints
> This involves primarily creating RESTful API endpoints.

#### Features
| Endpoints                     |         Functionality
| ----------------------        |------------------------                         | 
| GET    /api/v1/messages       | Get all Messages.                               | 
| GET    /api/v1/messages/:id   | Fetch a specific Message By its Identification  |
| POST   /api/v1/message        | Create / send a new Message                     |
| GET    /api/v1/messages/Unread| Get all unread messages                         |
| GET    /api/v1/messages/Sent  | Get all sent messages                           |
| Delete /api/v1/message/:id    | Delete a specific Message By its Identification | 
| POST   /api/v1/groups         | create a group.                                 | 
| GET    /api/v1/groups         | Fetch all group the user has created            |
| PATCH  groups/:groupId/name   | update a specific group                         |
| POST   groups/:groupId/users  | insert a group member in a group                |
| DELETE /:groupId/users/:id    | Delete a user in the group                      |
| POST /groups/groupId/messages | create a message to a  specific Group By its Identification

