import { getProfileLetters } from "./get-profile-letters";

describe("get profile letters", () => {
  test("should split by .", () => {
    const res = getProfileLetters({
      email: "evgeny.paromov@gmail.com",
    });

    expect(res).toEqual("EP");
  });

  test("should split by -", () => {
    const res = getProfileLetters({
      email: "avgeny.paromov@gmail.com",
      name: "Evgeny-Paromov",
    });

    expect(res).toEqual("EP");
  });

  test("should split by _", () => {
    const res = getProfileLetters({
      email: "avgeny.paromov@gmail.com",
      name: "Evgeny_Paromov",
    });

    expect(res).toEqual("EP");
  });

  test("should split by space", () => {
    const res = getProfileLetters({
      email: "evgeny.paromov@gmail.com",
      name: "Evgeny Paromov",
    });

    expect(res).toEqual("EP");
  });

  test("should return first 2 letters if no separator", () => {
    const res = getProfileLetters({
      email: "evgeny.paromov@gmail.com",
      name: "EvgenyParomov",
    });

    expect(res).toEqual("EV");
  });
  test("should return first 2 letters if no separator email", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
    });

    expect(res).toEqual("AD");
  });
  test("should return email if empty username", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "",
    });

    expect(res).toEqual("AD");
  });

  test("should work with short names", () => {
    const res = getProfileLetters({
      email: "admin@gmail.com",
      name: "E",
    });

    expect(res).toEqual("E");
  });
});
