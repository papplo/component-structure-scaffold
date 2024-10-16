import { CardProps, Card } from "../stateless/Card";
import { withSelectedState } from "./WithSelectedHOC";

export const EnhancedCard = withSelectedState<CardProps>(Card, {
  defaultSelected: false,
});
