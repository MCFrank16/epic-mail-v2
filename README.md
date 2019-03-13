# EpicMail

[![Build Status](https://travis-ci.com/MCFrank16/EpicMail.svg?branch=develop)](https://travis-ci.com/MCFrank16/EpicMail)
[![Coverage Status](https://coveralls.io/repos/github/MCFrank16/EpicMail/badge.svg?branch=develop)](https://coveralls.io/github/MCFrank16/EpicMail)
[![Maintainability](https://api.codeclimate.com/v1/badges/213f02e0fdf7279bd93f/maintainability)](https://codeclimate.com/github/MCFrank16/EpicMail/maintainability)

This is a messaging platform which let its user interact with each other. #AndelaChallenge

# Heroku Link: 
https://epik-mail.herokuapp.com/api/v1
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

