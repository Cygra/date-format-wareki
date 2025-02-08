import { ERA_NORTH, ERA_SOUTH, NARROW_ERA } from "./dict";

const eraRegex = /([^0-9]*)([0-9]+)\/([0-9]+)\/([0-9]+)/;

/**
 * @param date new Date()
 * @param options
 * @param options.era "long" 平成 | "narrow" H
 * @param options.nanboku "south" | "north"
 * @returns "平成8/11/27"
 * @example
 * toWareki(date); // => "平成8/11/27"
 * toWareki(date, { era: "narrow" }); // => "H8/11/27"
 */
export const toWareki = (
  date: Date,
  options: {
    era?: "long" | "narrow";
    nanboku?: "south" | "north";
  } = {
    era: "long",
    nanboku: "south",
  }
): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  let era: string = "";
  let startYear = 0;

  const dict = options.nanboku === "north" ? ERA_NORTH : ERA_SOUTH;
  Object.entries(dict).find((it) => {
    const [sy, sm, sd, ey, em, ed] = it[1];
    if (date >= new Date(sy, sm, sd) && date <= new Date(ey, em, ed)) {
      era = it[0];
      startYear = sy;
      return true;
    }
  });

  if (!era) {
    throw new Error("Invalid date.");
  }

  if (options?.era === "narrow" && NARROW_ERA[era]) {
    era = NARROW_ERA[era]!;
  }

  return `${era}${year - startYear + 1}/${month + 1}/${day}`;
};

/**
 * @param wareki "平成8/11/27"
 * @param options
 * @param options.nanboku "south" | "north"
 * @returns Date
 * @example
 * toDate("平成8/11/27"); // => new Date(1996, 10, 27)
 */
export const toDate = (
  wareki: string,
  options: {
    nanboku?: "south" | "north";
  } = {
    nanboku: "south",
  }
): Date => {
  const match = wareki.match(eraRegex);

  if (!match || !match[1] || !match[2] || !match[3] || !match[4]) {
    throw new Error("Invalid Wareki format.");
  }

  const era = match[1];
  const warekiYear = parseInt(match[2], 10);
  const month = parseInt(match[3], 10) - 1;
  const day = parseInt(match[4], 10);

  const dict = options.nanboku === "north" ? ERA_NORTH : ERA_SOUTH;

  const startDate = dict[era];

  if (!startDate) {
    throw new Error("Invalid era.");
  }

  return new Date(warekiYear + startDate[0] - 1, month, day);
};
