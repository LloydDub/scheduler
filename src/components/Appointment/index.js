// "appointment" component lives here
import "components/Appointment/styles.scss";
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //condtion renders 1st component
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // We pass this function to the Form component. The Form should capture the name and interviewer and pass them to props.onSave as arguments.
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={() => back()}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={() => back()} />
      )}
    </article>
  );
}
