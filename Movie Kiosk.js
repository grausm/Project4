/**
 *   @author Graus, Michael (grausm@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Project 4 movie kiosk || created: 11.20.2017
 *   @todo nothing
 */

"use strict";
const PROMPT = require('readline-sync');


let movies = [];
let avgRating, whichTask, whichMovie;

/**
 * @method
 * @desc dispatch method
 * @returns {null}
 */

function main() {
    process.stdout.write(`\x1Bc`);
    const RATE_MOVIE = 0;
    let infinite = 0;
    while (infinite < 1) {
        if (movies.length > 0) {
            setWhichTask();
            if (whichTask === RATE_MOVIE) {
                populateMovies();
            } else {
                setWhichMovie();
                setAvgRating();
                displayAvgRating();
            }
        } else {
            populateMovies();
        }
    }
}

/**
 * @method
 * @desc Whould you like to rate a movie
 * @returns {null}
 */

main();

function setWhichTask() {
    whichTask = -1;
    const RATE = 0, VIEW = 1;
    while (whichTask === null || whichTask !== RATE && whichTask !== VIEW) {
        whichTask = Number(PROMPT.question(`\nWould you like to rate a movie or view an average movie rating? [0 to rate 1 to view]: `));
    }
}

/**
 * @method
 * @desc Display movie titles
 * @returns {null}
 */

function displayMovieTitles() {
    for (let i = 0; i < movies.length; i++) {
        console.log(`\n ${i} = ${movies[i][0]}`);
    }
}

/**
 * @method
 * @desc Movie array
 * @returns {null}
 */

function populateMovies() {
    const COLUMNS = 4, TITLE = 0, RATING = 1, TOTAL_RATING = 2, COUNTER = 3;
    let movieChoice, newTitle;
    if (movies.length !== 0) {
        for (let i = 0; i < movies.length; i++) {
            console.log(`${i} = ${movies[i][0]}`);
            newTitle = i + 1;
        }
        while (movieChoice === null || isNaN(movieChoice) || movieChoice < TITLE) {
            movieChoice = Number(PROMPT.question(`\nPlease enter movies number, or ${newTitle} to enter a new title:  `));
        }
        if (movieChoice !== newTitle) {
            movies[movieChoice][RATING] = -1;
            while (isNaN(movies[movieChoice][RATING]) || movies[movieChoice][RATING] < 1 || movies[movieChoice][RATING] > 5) {
                movies[movieChoice][RATING] = Number(PROMPT.question(`\nPlease rate the movie [1 through 5] `));
            }
            movies[movieChoice][TOTAL_RATING] = movies[movieChoice][TOTAL_RATING] + movies[movieChoice][RATING];
            movies[movieChoice][COUNTER] = movies[movieChoice][COUNTER] + 1;
        } else {
            movies[newTitle] = [];
            for (let i = 0; i < COLUMNS; i++) {
                if (i === TITLE) {
                    while (movies[newTitle][i] == null || !/[a-zA-Z0-9 ]{1,30}/.test(movies[newTitle][i])) {
                        movies[newTitle][i] = PROMPT.question(`\nPlease enter a movie title: `);
                    }
                } else if (i === RATING) {
                    while (typeof movies[newTitle][i] == null || isNaN(movies[newTitle][i]) || movies[newTitle][i] < 1 || movies[newTitle][i] > 5) {
                        movies[newTitle][i] = Number(PROMPT.question(`\nPlease enter a rating [1 through 5]: `));
                    }
                } else if (i === TOTAL_RATING) {
                    movies[newTitle][i] = movies[newTitle][RATING];
                } else {
                    movies[newTitle][i] = 1;
                }
            }
        }
    } else {
        movies[0] = [];
        for (let i = 0; i < COLUMNS; i++) {
            if (i === TITLE) {
                movies[0][i] = PROMPT.question(`\nPlease enter a movie title: `);
            } else if (i === RATING) {
                movies[0][i] = PROMPT.question(`\nPlease rate the movie [1 through 5]: `);
            } else if (i === TOTAL_RATING) {
                movies[0][i] = movies[0][RATING];
            } else {
                movies[0][i] = 1;
            }
        }
    }
}

/**
 * @method
 * @desc What movie rating
 * @returns {null}
 */

function setWhichMovie() {
    for (let i = 0; i < movies.length; i++) {
        console.log(`\n ${i} = ${movies[i][0]}`);
    }
    whichMovie = Number(PROMPT.question(`Which movie's rating would you like to see? `));
}

/**
 * @method
 * @desc Average rating
 * @returns {null}
 */

function setAvgRating() {
    avgRating = Number(movies[whichMovie][2]) / (movies[whichMovie][3]);
}

/**
 * @method
 * @desc Display average rating
 * @returns {null}
 */

function displayAvgRating() {
    process.stdout.write(`\x1Bc`);
    console.log(`\n The average movie rating for ${movies[whichMovie][0]} is ${avgRating} stars. `);
}

/*
Movie Kiosk:  Re-factor your code to run a kiosk at a movie theater. Program should loop infinitely to allow users to either see average rating of previous user entries, or enter their own review.

    Requirements:

Should store movie title, current user rating, total rating, and number of ratings
Should display a list of movies for user to review or option to review a new one
Should allow user to select a movie to see average rating
*/