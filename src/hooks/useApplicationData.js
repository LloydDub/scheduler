import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = () => {
    setState({ ...state, day: "Monday" });
  };

  //book interview will be passed to each appointment component as props

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({ ...state, appointments });
    const days = updateSpots(-1);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments, days }));
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(1);
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }))
      .catch((err) => console.log(err));
  };

  const updateSpots = function (num) {
    const currentDay = state.day;

    const days = state.days.map((day) => {
      if (day.name === currentDay) {
        day.spots += num;
      }
      return day;
    });

    return days;
  };

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) => {
      console.log("!!!", all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
