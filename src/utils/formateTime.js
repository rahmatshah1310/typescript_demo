// src/utils/formatTime.js
import moment from "moment";


export const getShortTimeAgo = (timestamp) => {
  if (!timestamp || !timestamp.toDate) return ""; // safely return empty string or fallback

  const now = moment();
  const time = moment(timestamp.toDate());
  const diffInSeconds = now.diff(time, "seconds");

  if (diffInSeconds < 60) return "Now";

  const diffInMinutes = now.diff(time, "minutes");
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const diffInHours = now.diff(time, "hours");
  if (diffInHours < 24) return `${diffInHours}h`;

  const diffInDays = now.diff(time, "days");
  if (diffInDays < 7) return `${diffInDays}d`;

  const diffInWeeks = now.diff(time, "weeks");
  return `${diffInWeeks}w`;
};


 export const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp); // Handle Firebase Timestamp objects
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return `${Math.floor(diffInHours / 24)}d`;
    }
  };