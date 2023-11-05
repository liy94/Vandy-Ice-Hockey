export interface Location {
  name: string;
  numRiders: number;
}

export interface Passenger {
  id: string;
  location: string;
}

export interface Driver {
  id: string;
  location: string;
  availableSeats: number;
}

export function pairDriversAndRiders(
  riders: Passenger[],
  drivers: Driver[]
): [Driver, Passenger][] {
  const pairs: [Driver, Passenger][] = [];
  const availableDrivers: Driver[] = [...drivers];
  const extraRiders: Passenger[] = [];
  var locations: Map<string, number> = new Map();

  // Find the number of riders at each location
  for (const rider of riders) {
    const location = rider.location;

    if (locations.has(location)) {
      // Location already exists in the map, increment the rider count
      locations.set(location, locations.get(location)! + 1);
    } else {
      // Location doesn't exist in the map, initialize it with 1 rider
      locations.set(location, 1);
    }
  }

  // For each rider, check if there is a driver already at their location and pair them together.
  riders.forEach((rider) => {
    const matchingDriver = availableDrivers.find(
      (driver) =>
        driver.location === rider.location && driver.availableSeats > 0
    );
    if (matchingDriver) {
      pairs.push([matchingDriver, rider]);
      matchingDriver.availableSeats--;
      locations.set(rider.location, locations.get(rider.location)! - 1);
    } else {
      // If no drivers are at their location, add them to the extraRiders array.
      extraRiders.push(rider);
    }
  });

  drivers.sort(compareNumbers);
  for (const driver of drivers) {
    var max: number = 0;
    var location = "";
    locations.forEach((value: number, key: string) => {
      if (value <= driver.availableSeats && value > max) {
        max = value;
        location = key;
      }
    });
    if (max != 0) {
      const ridersAtLocation = extraRiders.filter(
        (rider) => rider.location === location
      );
      ridersAtLocation.forEach((rider) => {
        pairs.push([driver, rider]);
        driver.availableSeats--;
      });
      locations.set(location, 0);
    }
  }

  locations.forEach((value: number, key: string) => {
    if (value > 0) {
      const ridersAtLocation = extraRiders.filter(
        (rider) => rider.location === key
      );
      ridersAtLocation.forEach((rider) => {
        const availableDriver = availableDrivers.find(
          (driver) => driver.availableSeats > 0
        );
        if (availableDriver) {
          pairs.push([availableDriver, rider]);
          availableDriver.availableSeats--;
          locations.set(rider.location, locations.get(rider.location)! - 1);
        } else {
          console.log(
            `No available driver with enough seats for extra rider at ${rider.location}`
          );
        }
      });
    }
  });

  return pairs;
}

function compareNumbers(a: Driver, b: Driver) {
  return b.availableSeats - a.availableSeats;
}
