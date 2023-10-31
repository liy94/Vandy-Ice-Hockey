export interface User {
    _id: string;
    name: string; 
    mobile_number: string;
    pickup_location: string;
    email: string;
    has_car: Boolean; 
    car_capacity: number;
    car_build: string;
    assigned_carpool_id: string;
    weekly_response: string;
}


export interface Carpool {
    _id: string;
    driverID: string;
    riderIDs: string[];
    rideDate: string;
}

