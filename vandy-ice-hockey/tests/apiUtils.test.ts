import { User } from "@/types/User";
import {
  fetchUserWithStatus,
  fetchAllUsersWithStatus,
  updateUser,
  createUser,
  deleteUser,
  addRiderToUser,
  resetUsers,
  changeDriver,
} from "../src/utils/apiUtils";

describe("testing utils", () => {
  test("create and update user", async () => {
    let user: User = {
      name: "test",
      phone: "12345",
      email: "unittesting@vanderbilt.edu",
      attendance: "Yes",
      hasCar: "Yes",
      numberOfSeats: 3,
      location: "EBI",
      driver: "",
      riders: [],
    };

    let updatedUser: User = {
      name: "test2",
      phone: "54321",
      email: "unittesting@vanderbilt.edu",
      attendance: "No",
      hasCar: "No",
      numberOfSeats: 1,
      location: "Highland",
      driver: "",
      riders: [],
    };

    //await createUser(user);
    await updateUser(user);
    await fetchUserWithStatus(user.email).then((response: any) => {
      if (response.status === 200) {
        user = response.data;
        expect(user.name).toBe("test");
        expect(user.phone).toBe("12345");
        expect(user.email).toBe("unittesting@vanderbilt.edu");
        expect(user.attendance).toBe("Yes");
        expect(user.hasCar).toBe("Yes");
        expect(user.numberOfSeats).toBe(3);
        expect(user.location).toBe("EBI");
      }
    });

    await updateUser(updatedUser);
    await fetchUserWithStatus(updatedUser.email).then((response: any) => {
      if (response.status === 200) {
        updatedUser = response.data;
        expect(updatedUser.name).toBe("test2");
        expect(updatedUser.phone).toBe("54321");
        expect(updatedUser.email).toBe("unittesting@vanderbilt.edu");
        expect(updatedUser.attendance).toBe("No");
        expect(updatedUser.hasCar).toBe("No");
        expect(updatedUser.numberOfSeats).toBe(1);
        expect(updatedUser.location).toBe("Highland");
      }
    });

    //await deleteUser(updatedUser.email);
    // await fetchUserWithStatus(updatedUser.email).then((response: any) => {
    //   if (response.status === 200) {
    //     console.log("deleted user still able to be fetched");
    //   }
    // });
  });

  test("algorithm utils", async () => {
    await fetchAllUsersWithStatus();
    const driverEmail = "unittesting@vanderbilt.edu";
    const riderEmail = "unittesting2@vanderbilt.edu";

    await addRiderToUser(driverEmail, riderEmail);
    await fetchUserWithStatus(driverEmail).then((response: any) => {
      if (response === 200) {
        expect(response.data.riders[0]).toBe(riderEmail);
      }
    });
    await changeDriver(riderEmail, driverEmail);
    await fetchUserWithStatus(riderEmail).then((response: any) => {
      if (response === 200) {
        expect(response.data.driver).toBe(driverEmail);
      }
    });

    await resetUsers();
    await fetchUserWithStatus(driverEmail).then((response: any) => {
      if (response === 200) {
        expect(response.data.riders.length).toBe(0);
      }
    });
    await changeDriver(riderEmail, driverEmail);
    await fetchUserWithStatus(riderEmail).then((response: any) => {
      if (response === 200) {
        expect(response.data.driver).toBe("");
      }
    });
  });

  test("failure", async () => {
    const errorUser: User = {
      name: "",
      phone: "",
      email: "",
      attendance: "",
      hasCar: "",
      numberOfSeats: 0,
      location: "",
      driver: "",
      riders: [],
    };
    const errorEmail = "";

    const fetchData = await fetchUserWithStatus(errorEmail);
    expect(fetchData).toEqual({
      data: null,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(updateUser(errorUser)).rejects.toThrowError();

    const changeData = await changeDriver(errorEmail, errorEmail);
    expect(changeData).toBe(undefined);

    await expect(addRiderToUser(errorEmail, errorEmail)).rejects.toThrowError();
    await expect(deleteUser(errorEmail)).rejects.toThrowError();
  });
});
