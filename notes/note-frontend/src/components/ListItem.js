import React from 'react';
import { Link } from 'react-router-dom';

const getTitle = (note) => {
  const title = note.body.split('\n')[0]
  if (title.length > 45) {
    return title.slice(0,45)
  }
  return title
}

const getBody = (note) => {
  let title = getTitle(note)
  let content = note.body.replaceAll('\n', ' ')
  content = content.replaceAll(title, '')

  if (content.length > 45) {
      return content.slice(0, 45) + '...'
  } else {
      return content
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amOrPm = date.getHours() >= 12 ? 'pm' : 'am';

  return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}, ${hours}:${minutes}${amOrPm}`;
};


const ListItem = ({note}) => {
  return (
    <div>
        <Link to={`/note/${note.id}/`}>
            <div className='notes-list-item'>
                <h1>{note.title}</h1>
                <h3>{getTitle(note)}</h3>
                <p>{getBody(note)}</p>
                <p><span>{formatDate(note.updated)}</span></p>
            </div>
        </Link>
    </div>
  )
}

export default ListItem;