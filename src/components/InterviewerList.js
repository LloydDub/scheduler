import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((value) => (
          <InterviewerListItem
            key={value.id}
            name={value.name}
            avatar={value.avatar}
            selected={value.id === props.value}
            setInterviewer={() => props.onChange(value.id)}
          />
        ))}
      </ul>
    </section>
  );
}
