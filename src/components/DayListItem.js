import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

// this sets the action for props
export default function DayListItem(props) {
  const dayClass = classNames("day-list", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  // this formats the spots
  const formatSpots = function (spotsNum) {
    if (spotsNum === 0) {
      return "no spots remaining";
    } else if (spotsNum === 1) {
      return `${spotsNum} spot remaining`;
    } else {
      return `${spotsNum} spots remaining`;
    }
  };

  // this returns the jsx compnent
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
