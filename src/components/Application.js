import React from "react";

import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}

// export default function Application(props) {
//   // the state!!
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {},
//   });

//   const setDay = () => {
//     setState({ ...state, day: "Monday" });
//   };

//   const appointments = getAppointmentsForDay(state, state.day);
//   const interviewers = getInterviewersForDay(state, state.day);

//   //book interview will be passed to each appointment component as props

//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview },
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };

//     setState({ ...state, appointments });
//     return axios
//       .put(`/api/appointments/${id}`, { interview })
//       .then(() => setState({ ...state, appointments }));
//   }
//   const cancelInterview = (id) => {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null,
//     };

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };

//     return axios
//       .delete(`/api/appointments/${id}`)
//       .then(() => setState({ ...state, appointments }))
//       .catch((err) => console.log(err));
//   };

//   const appointmentComponents = appointments.map((appointment) => {
//     const interview = getInterview(state, appointment.interview);

//     return (
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={interview}
//         interviewers={interviewers}
//         bookInterview={bookInterview}
//         cancelInterview={cancelInterview}
//       />
//     );
//   });

//   useEffect(() => {
//     Promise.all([
//       axios.get(`http://localhost:8001/api/days`),
//       axios.get(`http://localhost:8001/api/appointments`),
//       axios.get(`http://localhost:8001/api/interviewers`),
//     ]).then((all) => {
//       console.log("!!!", all);
//       setState((prev) => ({
//         ...prev,
//         days: all[0].data,
//         appointments: all[1].data,
//         interviewers: all[2].data,
//       }));
//     });
//   }, []);

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={state.days} value={state.day} onChange={setDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {appointmentComponents}
//         <Appointment key="last" time="5pm" />
//       </section>
//     </main>
//   );
// }
