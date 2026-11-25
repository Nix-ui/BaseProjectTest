import multiplicar from "./multiplicador.js";

describe("Multiplicador", () => {
  it("deberia multiplicar 2 numeros", async () => {
    expect(multiplicar(2, 3)).toBe(6);
  });
});
