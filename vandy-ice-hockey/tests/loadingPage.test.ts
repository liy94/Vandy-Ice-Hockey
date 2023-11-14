import { checkIfUserExists } from "../src/utils/loadingPage";

test("loadingPage util", async () => {
  const email = "unittesting3@vanderbilt.edu";
  const errorEmail = "";

  const userExists = await checkIfUserExists(email);
  expect(userExists).toEqual({
    _id: "655262db6b18315ba36c235c",
    attendance: "No",
    driver: "",
    email: "unittesting3@vanderbilt.edu",
    hasCar: "Yes",
    location: "Kissam",
    name: "test3",
    numberOfSeats: 4,
    phone: "7890",
    riders: [],
  });

  const noUser = await checkIfUserExists(errorEmail);
  expect(noUser).toBe(false);
});
