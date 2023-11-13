import { checkIfUserExists } from "../src/utils/loadingPage";
test("loadingPage util", async () => {
  const email = "unittesting@vanderbilt.edu";
  const errorEmail = "";

  const userExists = await checkIfUserExists(email);
  expect(userExists).toEqual({
    _id: "65515c974b5f248c3c91973b",
    attendance: "No",
    driver: "",
    email: "unittesting@vanderbilt.edu",
    hasCar: "No",
    location: "Highland",
    name: "test2",
    numberOfSeats: 1,
    phone: "54321",
    riders: [],
  });

  const noUser = await checkIfUserExists(errorEmail);
  expect(noUser).toBe(false);
});
