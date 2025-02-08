import { toDate, toWareki } from ".";

describe("date-format-wareki", () => {
  describe("toWareki", () => {
    it("date check", () => {
      expect(() => toWareki(new Date(660, 10, 27))).toThrow("Invalid date.");
    });
    it("format", () => {
      expect(toWareki(new Date(1996, 10, 27))).toBe("平成8/11/27");
      expect(toWareki(new Date(1996, 10, 27), { era: "long" })).toBe(
        "平成8/11/27"
      );
      expect(toWareki(new Date(1996, 10, 27), { era: "narrow" })).toBe(
        "H8/11/27"
      );

      expect(toWareki(new Date(1338, 10, 27), { nanboku: "south" })).toBe(
        "延元3/11/27"
      );
      expect(toWareki(new Date(1338, 10, 27), { nanboku: "north" })).toBe(
        "暦応1/11/27"
      );
    });
  });
  describe("toDate", () => {
    it("format check", () => {
      expect(() => toDate("平成8/11")).toThrow("Invalid Wareki format.");
      expect(() => toDate("era1/11/27")).toThrow("Invalid era.");
    });
    it("format", () => {
      expect(toDate("平成8/11/27")).toStrictEqual(new Date(1996, 10, 27));
      expect(toDate("H8/11/27")).toStrictEqual(new Date(1996, 10, 27));

      expect(toDate("延元3/11/27", { nanboku: "south" })).toStrictEqual(
        new Date(1338, 10, 27)
      );
      expect(toDate("暦応1/11/27", { nanboku: "north" })).toStrictEqual(
        new Date(1338, 10, 27)
      );
    });
  });
});
