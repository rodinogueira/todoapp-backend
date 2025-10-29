export enum Plan {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
}

export const PlanRank: Record<Plan, number> = {
  [Plan.BRONZE]: 1,
  [Plan.SILVER]: 2,
  [Plan.GOLD]: 3,
};
