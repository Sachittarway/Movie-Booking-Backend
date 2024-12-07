import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10, // number of virtual users
    duration: '30s', // duration of the test
};

export default function () {
    // Create Movie
    let createMovieResponse = http.post('http://localhost:4000/create', JSON.stringify({
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
    }), { headers: { 'Content-Type': 'application/json' } });

    check(createMovieResponse, {
        'Create movie status is 200': (r) => r.status === 200,
    });
    
    // Get All Movies
    let getAllMoviesResponse = http.get('http://localhost:4000/allmovies');
    check(getAllMoviesResponse, {
        'Get all movies status is 200': (r) => r.status === 200,
    });

    // Get Movie by ID
    let getMovieByIdResponse = http.get('http://localhost:4000/movie/1'); // Replace '1' with a valid ID
    check(getMovieByIdResponse, {
        'Get movie by ID status is 200': (r) => r.status === 200,
    });

    // Book Seats
    let bookSeatsResponse = http.post('http://localhost:4000/book', JSON.stringify({
        movieId: '1', // Replace with a valid movie ID
        seats: [1, 2, 3],
    }), { headers: { 'Content-Type': 'application/json' } });
    check(bookSeatsResponse, {
        'Book seats status is 200': (r) => r.status === 200,
    });

    // Get Ticket Details
    let getTicketDetailsResponse = http.post('http://localhost:4000/tickets', JSON.stringify({
        ticketId: '12345', // Replace with a valid ticket ID
    }), { headers: { 'Content-Type': 'application/json' } });
    check(getTicketDetailsResponse, {
        'Get ticket details status is 200': (r) => r.status === 200,
    });

    sleep(1); // wait for 1 second before next iteration
}