import { getAdverts, getAdvertDetail } from "./selectors";

describe("getAdverts", () => {
  const data = [
    { createdAt: "1", id: "a" },
    { createdAt: "2", id: "b" },
  ];
  test("should return all adverts", () => {
    const result = getAdverts({ adverts: { data } });
    expect(result).toHaveLength(data.length);
  });
  test("should return adverts sorted by createdAt desc", () => {
    const result = getAdverts({ adverts: { data } });
    expect(result[0].id).toBe("b");
  });
});

describe("getAdvertDetail", () => {
  const data = [
    { createdAt: "1", id: "a" },
    { createdAt: "2", id: "b" },
  ];
  const id = "a";
  test("should return the filtered advert", () => {
    const result = getAdvertDetail({ adverts: { data } }, id);
    expect(result).toStrictEqual({ createdAt: "1", id: "a" });
  });
});
