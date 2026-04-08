import { describe, expect, it } from "vitest";
import { formatPtBrDate } from "@/lib/utils";

describe("formatPtBrDate", () => {
  it("formats ISO dates without timezone shift", () => {
    expect(formatPtBrDate("2026-04-01")).toBe("01/04/2026");
    expect(formatPtBrDate("2026-04-08")).toBe("08/04/2026");
  });

  it("supports localized formatting options", () => {
    expect(
      formatPtBrDate("2026-04-01", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    ).toContain("abril");
  });
});
