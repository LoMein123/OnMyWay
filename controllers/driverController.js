/**
 * @file driverController.js
 * @description Controller for handling driver requests
 */
const tripModel = require('../models/tripModel');
const tripBookingModel = require('../models/tripBookingModel');


/**
 * @function tripsAvailableForDriver
 * @description Display all trip requests for a driver on the driver dashboard page
 */
const tripsAvailableForDriver = async (req, res) => {
    try {
        const availableTrips = await tripModel.getTripsAvailableForDriver();
        res.render('driverDashboard', { availableTrips, error: null });
    } catch (error) {
        res.render('driverDashboard', { availableTrips: [], error: error.message });
    }
};

/**
 * @function driverSelectTrip
 * @description Process the driver selecting a trip request
 */
const driverSelectTrip = (req, res) => {
    console.log("In driverSelectTrip");

    const tripId = req.params.tripId;
    const passengerId = req.params.reqId;       // passenger is the requester
    const seatsTaken = req.params.seatsAvail;   // seatsTaken = seatsRequired because requester won't ask for more seats then they need
    const driverId = req.session.userId;        // driver is the current user

    console.log("tripId = " + tripId);
    console.log("passengerId (requestor ) = " + passengerId);
    console.log("seatsTaken = " + seatsTaken);
    console.log("driver Id (login now) = " + driverId);

    // Call the model to update the request's driver id from 0 to the current user id (driverId = 0 when the trip has no driver) and change the status to 'full',
    // then add a new trip booking record for the passenger, and display flash message based on success or failure
    tripModel.updateDriverSelectTrip(tripId, driverId, passengerId, (success) => {
        if (success) {
            console.log("calling tripBookModel.bookTrip: " + tripId, " passengerId = " +
                passengerId + "seatsTaken = " + seatsTaken);

            tripBookingModel.bookTrip(tripId, passengerId, seatsTaken, (error, message) => {
                if (error) {
                    req.flash('error', error);
                } else {
                    req.flash('message', message);
                }
                res.redirect('/driver/dashboard');
            });
        } else {
            req.flash('error', 'An error occurred during seats booking.');
            res.redirect('/driver/dashboard');
        }
    });
};


/**
 * @function displayDriverConfirmedBookings
 * @description Display all confirmed trips for a driver on the driver confirmed bookings page
 */
const displayDriverConfirmedBookings = async (req, res) => {
    const driverId = req.session.userId;

    try {
        const confirmedBookings = await tripModel.getDriverConfirmedBookings( driverId);
        res.render('driverConfirmed', { confirmedBookings, error: null });
    } catch (error) {
        res.render('driverConfirmed', { confirmedBookings: [], error: error.message });
    }
};


/**
 * @function displayDriverRequestedBookings
 * @description Display all trips posted by a driver on the driver requested bookings page
 */
const displayDriverRequestedBookings = async (req, res) => {
    const driverId = req.session.userId;

    try {
        const requestedBookings = await tripModel.getDriverRequestedBookings(driverId);
        res.render('driverRequested', { requestedBookings, error: null });
    } catch (error) {
        res.render('driverRequested', { requestedBookings: [], error: error.message });
    }
};


/**
 * @function driverReq
 * @description Display the driver request page (for creating a new trip)
 */
const driverReq = async (req, res) => {
    try {
        const cities = await tripModel.getCities();
        res.render('driverReq', { cities, error: null });
    } catch (error) {
        res.render('driverReq', { cities: [], error: error.message });
    }
};


/**
 * @function processDriverReq
 * @description Process the driver creating a new trip
 */
const processDriverReq = (req, res) => {
    const { inputDate, inputTime, inputFrom, inputTo, inputSeats } = req.body;

    console.log("driverController.processDriverReq");
    console.log("inputDate = " + inputDate);
    console.log("inputTime = " + inputTime);
    console.log("inputFrom = " + inputFrom);
    console.log("inputTo   = " + inputTo);
    console.log("inputSeats = " + inputSeats);

    const requestDriverId = req.session.userId; 

    console.log("requestDriverId = " + requestDriverId);

    tripModel.processDriverReq(inputDate, inputTime, inputFrom, inputTo, inputSeats,
        requestDriverId, (error, message) => {
            if (error) {
                console.log("tripModel.processDriverReq(), error = " + error);
                req.flash('error', error);
                res.redirect('/driver/request');
            }
            else {
                console.log("tripModel.processDriverReq(), tripId = ", message);
                req.flash('message', 'Trip request added.');
                res.redirect('/driver/request');
            }
        });
};


module.exports = {
    tripsAvailableForDriver,
    driverSelectTrip,

    displayDriverConfirmedBookings,
    
    displayDriverRequestedBookings,

    driverReq,
    processDriverReq
};
