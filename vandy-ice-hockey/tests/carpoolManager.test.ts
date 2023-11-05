import {
  Passenger,
  Driver,
  pairDriversAndRiders,
} from "../src/utils/carpoolManager";

describe("pairing algorithm", () => {
  test("initial test", () => {
    const riders: Passenger[] = [
      { location: "A", id: "Rider1 at A" },
      { location: "B", id: "Rider2 at B" },
      { location: "A", id: "Rider3 at A" },
      { location: "C", id: "Rider4 at C" },
      { location: "C", id: "Rider5 at C" },
      { location: "C", id: "Rider6 at C" },
    ];

    const drivers: Driver[] = [
      { location: "B", availableSeats: 2, id: "Driver1 at B" },
      { location: "A", availableSeats: 3, id: "Driver2 at A" },
      { location: "C", availableSeats: 2, id: "Driver3 at C" },
    ];

    const pairs = pairDriversAndRiders(riders, drivers);

    // pairs.forEach((pair) => {
    //   console.log(pair);
    // });

    let driver1: Driver = {
      location: "B",
      availableSeats: 0,
      id: "Driver1 at B",
    };

    let driver2: Driver = {
      location: "A",
      availableSeats: 1,
      id: "Driver2 at A",
    };

    let driver3: Driver = {
      location: "C",
      availableSeats: 0,
      id: "Driver3 at C",
    };

    let rider1: Passenger = { location: "A", id: "Rider1 at A" };
    let rider2: Passenger = { location: "B", id: "Rider2 at B" };
    let rider3: Passenger = { location: "A", id: "Rider3 at A" };
    let rider4: Passenger = { location: "C", id: "Rider4 at C" };
    let rider5: Passenger = { location: "C", id: "Rider5 at C" };
    let rider6: Passenger = { location: "C", id: "Rider6 at C" };

    const testPairs: [Driver, Passenger][] = [];
    testPairs.push([driver2, rider1]);
    testPairs.push([driver1, rider2]);
    testPairs.push([driver2, rider3]);
    testPairs.push([driver3, rider4]);
    testPairs.push([driver3, rider5]);
    testPairs.push([driver1, rider6]);

    expect(pairs[0]).toEqual(testPairs[0]);
    expect(pairs[1]).toEqual(testPairs[1]);
    expect(pairs[2]).toEqual(testPairs[2]);
    expect(pairs[3]).toEqual(testPairs[3]);
    expect(pairs[4]).toEqual(testPairs[4]);
    expect(pairs[5]).toEqual(testPairs[5]);
  });

  test("edge case", () => {
    const riders: Passenger[] = [
      { location: "A", id: "Rider1 at A" },
      { location: "A", id: "Rider2 at A" },
      { location: "A", id: "Rider3 at A" },
      { location: "C", id: "Rider4 at C" },
      { location: "C", id: "Rider5 at C" },
      { location: "C", id: "Rider6 at C" },
      { location: "C", id: "Rider7 at C" },
    ];

    const drivers: Driver[] = [
      { location: "B", availableSeats: 3, id: "Driver1 at B" },
      { location: "B", availableSeats: 2, id: "Driver2 at B" },
      { location: "C", availableSeats: 0, id: "Driver3 at C" },
    ];

    const pairs = pairDriversAndRiders(riders, drivers);

    let driver1: Driver = {
      location: "B",
      availableSeats: 0,
      id: "Driver1 at B",
    };

    let driver2: Driver = {
      location: "B",
      availableSeats: 0,
      id: "Driver2 at B",
    };

    let rider1: Passenger = { location: "A", id: "Rider1 at A" };
    let rider2: Passenger = { location: "A", id: "Rider2 at A" };
    let rider3: Passenger = { location: "A", id: "Rider3 at A" };
    let rider4: Passenger = { location: "C", id: "Rider4 at C" };
    let rider5: Passenger = { location: "C", id: "Rider5 at C" };

    const testPairs: [Driver, Passenger][] = [];
    testPairs.push([driver1, rider1]);
    testPairs.push([driver1, rider2]);
    testPairs.push([driver1, rider3]);
    testPairs.push([driver2, rider4]);
    testPairs.push([driver2, rider5]);

    expect(pairs[0]).toEqual(testPairs[0]);
    expect(pairs[1]).toEqual(testPairs[1]);
    expect(pairs[2]).toEqual(testPairs[2]);
    expect(pairs[3]).toEqual(testPairs[3]);
    expect(pairs[4]).toEqual(testPairs[4]);
  });
});
