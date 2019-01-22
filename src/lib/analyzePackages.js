import { queryNpms } from "./queryNpms";

const SCORE_CUTOFF = 0.4;

export const getSuspicious = async packages => {
  const promises = Object.keys(packages).map(async p => {
    const result = await queryNpms(p);
    return { name: p, ...result };
  });

  const data = await Promise.all(promises);

  return data.filter(p => {
    if (p.code === "NOT_FOUND") {
      return true;
    }
    if (p.score.final < SCORE_CUTOFF) {
      return true;
    }
    return false;
  });
};
