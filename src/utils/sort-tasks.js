export const sortTasks = (type, arr) => {
  let sortedTasks = [];
  switch (type) {
    case "new":
      sortedTasks = [...arr].sort((a, b) => b.date - a.date);
      break;
    case "old":
      sortedTasks = [...arr].sort((a, b) => a.date - b.date);
      break;
    case "alphavite":
      sortedTasks = [...arr].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    default:
      sortedTasks = [...arr].sort((a, b) => b.date - a.date);
      break;
  }
  return sortedTasks;
};



// export const sortTasks = (type, arr) => {
//   let sortedTasks = [];
//   switch (type) {
//     case "new":
//       return (a, b) => b.dateForSort - a.dateForSort
//       break;
//     case "old":
//       return (a, b) => a.dateForSort - b.dateForSort
//       break;
//     case "alphavite":
//       return (a, b) =>
//         a.name.localeCompare(b.name)
//       break;
//     default:
//       return (a, b) => b.date - a.date
//   return sortedTasks;}
// };

// WebTransportBidirectionalStream.sort?(sortTasks('new'))
