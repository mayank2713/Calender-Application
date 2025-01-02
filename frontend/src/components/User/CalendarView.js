import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import '../styles/fullcalendar.css'; // Importing external styles

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/communications');
        const formattedEvents = data.map((comm) => ({
          title: `${comm.type}${comm.notes ? `: ${comm.notes}` : ''}`,
          date: comm.date,
          backgroundColor: comm.type === 'Email' ? '#4caf50' : '#2196f3', // Different colors for event types
          textColor: '#fff',
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching communications:', error);
        alert('Failed to load events. Please try again later.');
      }
    };
    fetchCommunications();
  }, []);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Communication Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        eventDisplay="block"
        height="auto"
      />
    </div>
  );
};

export default CalendarView;
