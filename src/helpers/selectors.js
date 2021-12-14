export function getAppointmentsForDay(state, day) {
  const result = [];
  const dayData = state.days.filter((d) => d.name === day);
  if (dayData.length === 0) return result;
  for (const a of dayData[0].appointments) {
    result.push(state.appointments[a]);
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    return { ...interview, interviewer };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayData = state.days.filter((d) => d.name === day);
  if (dayData.length === 0) return result;
  for (const a of dayData[0].interviewers) {
    result.push(state.interviewers[a]);
  }
  return result;
}

//return interview object state.interviewer[1]
