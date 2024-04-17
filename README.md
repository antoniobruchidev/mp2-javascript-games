# Javascript GAMES by antoniobruchidev

## One logic game

To win the game the user has to form the fibonacci sequence from top-left.

|Column 1        | Column 2       | Column 3       | Column 4       | TO             |Column 1        | Column 2       | Column 3       | Column 4       |
|:--------------:|:--------------:|:--------------:|:--------------:|:--------------:|:--------------:|:--------------:|:--------------:|:--------------:|
| 5              | 1              | 34             | 610            |                | 1              | 1              | 2              | 3              |
| 3              | 21             | 8              | 144            |  TO            | 5              | 8              | 13             | 21             |
| 13             | 1              | 2              | 55             |                | 34             | 55             | 89             | 144            |
| 89             | 377            | 233            |                |                | 233            | 377            | 610            |                |

## One knowledge game

To win the game the user has to guess the correct characters included in a word, given its definition.
Classic Hangman!

## Table of Contents

- [Javascript GAMES by antoniobruchidev](#Javascript GAMES by antoniobruchidev)
  - [Table of Contents](#table-of-contents)
    - [UX](#ux)
    - [User stories](#user-stories)
      - [Strategy](#strategy)
      - [Scope](#scope)
      - [Structure](#structure)
      - [Skeleton](#skeleton)
        - [Wireframes](#wireframes)

## UX

The website targets people wanting to relax playing some games.

### User stories

- As a user I want to be able to play different kind of games.
- As a user I want to fully understand the rules and how to play each game.
- As a user I want to understand that my actions are recognized and interpreted well.
- As a user I want to be able to check my current score.

### Strategy

The goal is to make a well-functioning web application with which the user can interact and receive accurate responses.

### Scope

I want users to be able to enjoy a brief amount of their time.

### Structure

This web application is single page based, composed by a header and four sections sittin on top a moving background. Only one section of the first three sections is visible at the time and in mobile view the header is visible only in the landing page. The fourth section is the rules/landing page for both games. It acts as a modal stacking on top of the other layers. The javascript will handle what will be visible on each sections, dependind from the user's request.

**Website Sections:**
| Section                | Content                                                       |
|------------------------|---------------------------------------------------------------|
| Landing page           | A header and the choice between two different games           |
| Logic game page        | Logic game page                                               |
| Knowledge game page    | Knwoledge game page                                           |
| Rules game page        | Rules game page                                               |

### Skeleton

The website is designed to be clear and simple.

#### Wireframes

- [Home](assets/pdf/home-wireframe.pdf)
- [Logic Game](assets/pdf/logic-wireframe.pdf)
- [Knowledge Game](assets/pdf/knowledge-wireframe.pdf)

### Surface

I used greenyellow as color on an opacized particles background mostly.

## Technologies

1. HTML - To create a basic site.
2. CSS - To create a nice, standout front-end and to give a great user experience.
3. JS - To have nice moving backgroun, game states.
4. jQuery UI - Starting with the web app navigation, I'll use it for mostly everything in this progject.
5. GIMP - To elaborate images.
6. RapidAPI - [To retrieve 10 random words](https://rapidapi.com/st-s2DBxyBlu/api/a-randomizer-data-api)

## Credits

1. [Moving background](https://github.com/marcbruederlin/particles.js)
2. [Loading Bar](https://css-loaders.com/progress/)
