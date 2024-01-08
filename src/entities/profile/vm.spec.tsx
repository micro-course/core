import { getProfielLetters } from "./vm";

describe("get profile letters", () => {
  test("should split by .", () => {
    const res = getProfielLetters({
      userId: "1",
      email: "evgeny.paromov@gmail.com",
    });

    expect(res).toEqual("EP");
  });

  test("should split by -", () => {
    const res = getProfielLetters({
      userId: "1",
      email: "evgeny.paromov@gmail.com",
    });

    expect(res).toEqual("EP");
  });

  test("should split by space", () => {
    const res = getProfielLetters({
      userId: "1",
      email: "evgeny.paromov@gmail.com",
      name: "Evgeny Paromov",
    });

    expect(res).toEqual("EP");
  });

  test("should return first 2 letters if no separator", () => {
    const res = getProfielLetters({
      userId: "1",
      email: "evgeny.paromov@gmail.com",
      name: "EvgenyParomov",
    });

    expect(res).toEqual("EV");
  });
  test("should return first 2 letters if no separator email", () => {
    const res = getProfielLetters({
      userId: "1",
      email: "admin@gmail.com",
    });

    expect(res).toEqual("AD");
  });
  test("should return email if empty username", () => {
    const res = getProfielLetters({
      userId: "1",
      email: "admin@gmail.com",
      name: "",
    });

    expect(res).toEqual("AD");
  });
});
