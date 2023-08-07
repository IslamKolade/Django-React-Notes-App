import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getNote = async () => {
            if (id === 'new') return

            let response = await fetch(`https://quicknotes.pythonanywhere.com/api/note/${id}/`)
            let data = await response.json()
            setNote(data);
        }
        getNote();
    }, [id]);

    const updateNote = async () => {
        await fetch(`https://quicknotes.pythonanywhere.com/api/note/${id}/`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    const createNote = async () => {
        await fetch(`https://quicknotes.pythonanywhere.com/api/notes/`, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    const deleteNote = async () => {
        await fetch(`https://quicknotes.pythonanywhere.com/api/note/${id}/`, {
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        navigate('/');
    }

    const handleSubmit = () => {
        if(id !== 'new' && note.body === '') {
            deleteNote();
        } else if (id !== 'new') {
            updateNote();
        } else if (id === 'new' && note.body !== null) {
            createNote()
        }
        navigate('/');
    }

    const handleSave = () => {
        updateNote();
        setSaved(true);
    }
    const handleNoteChange = (e) => {
        setNote({ ...note, 'body': e.target.value });
        setSaved(false);
    };
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
      

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                    {note?.title}
                </h3>
                {id !== 'new' ? (
                <h4 onClick={handleSave} style={{cursor:'pointer'}}>
                    {saved ? 'Saved' : 'Save'}
                </h4>
                ) : (
                <h4 onClick={handleSubmit} style={{cursor:'pointer'}}>Done</h4>
                )}
            </div>
            <p>{formatDate(note?.created)}</p>
            <textarea onChange={handleNoteChange} value={note?.body|| ''} onBlur={handleNoteChange} placeholder='Body'></textarea>
            {id !== 'new' ? (
            <h4 onClick={deleteNote} className='delete'>Delete</h4>
            ) : (
            <></>
            )}
        </div>
    )
}
export default NotePage;
