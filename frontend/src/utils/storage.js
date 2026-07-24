export function saveHistory(type, data) {

  const existingHistory = JSON.parse(
    localStorage.getItem("careerpilot_history") || "[]"
  );


  const newEntry = {
    id: Date.now(),
    type: type,
    data: data,
    date: new Date().toLocaleString()
  };


  const updatedHistory = [
    ...existingHistory,
    newEntry
  ];


  localStorage.setItem(
    "careerpilot_history",
    JSON.stringify(updatedHistory)
  );


  window.dispatchEvent(
    new Event("storageUpdated")
  );

}



export function getHistory() {

  return JSON.parse(
    localStorage.getItem("careerpilot_history") || "[]"
  );

}



export function clearHistory() {

  localStorage.removeItem(
    "careerpilot_history"
  );


  window.dispatchEvent(
    new Event("storageUpdated")
  );

}