import { SetMetadata } from '@nestjs/common';
import { Plan } from './plan.enum';

export const REQUIRE_PLAN_KEY = 'require_plan';
export const RequirePlan = (plan: Plan) => SetMetadata(REQUIRE_PLAN_KEY, plan);
