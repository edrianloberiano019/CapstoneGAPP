import React, { useState, useEffect } from 'react';
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameDay,
  startOfWeek,
  addMonths,
  subMonths,
} from 'date-fns';
import { db } from '../firebase';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
import Loading from './Loading';
import { useAuth } from './authContext';
import { motion } from 'framer-motion';

function Calendar() {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { currentUser } = useAuth();

  const today = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const options = { month: 'long', year: 'numeric' };
  const formattedMonth = currentDate.toLocaleDateString(undefined, options);

  // Add placeholders for days to align with a Sunday-start week
  const startPaddingDays = Array.from(
    { length: monthStart.getDay() },
    (_, i) => addMonths(monthStart, i)
  );

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        setUserRole(userDoc.exists() ? userDoc.data().role : 'educator');
      }
    };
    fetchUserRole();

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const eventsCollection = collection(db, 'events');
        const eventDocs = await getDocs(eventsCollection);
        const eventsMap = {};
        eventDocs.forEach((doc) => {
          eventsMap[doc.id] = doc.data().eventText;
        });
        setEvents(eventsMap);
      } catch (error) {
        console.error('Error fetching events: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentUser]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEventText(events[format(date, 'yyyy-MM-dd')] || '');
  };

  const handleAddEvent = async () => {
    if (selectedDate && eventText) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const updatedEvents = { ...events, [formattedDate]: eventText };

      setEvents(updatedEvents);
      await setDoc(doc(db, 'events', formattedDate), { eventText: eventText })
        .then(() => {
          setEventText('');
          setSelectedDate(null);
        })
        .catch((error) => {
          console.error('Error adding event to Firestore: ', error);
        });
    }
  };

  const handleMonthChange = (event) => {
    const [year, month] = event.target.value.split('-');
    setCurrentDate(new Date(year, month - 1));
  };

  const formattedDate = format(selectedDate, 'dd');

  return (
    <div>
      {userRole === 'admin' ? (
        <div className="container mx-auto px-4 pb-4">
          <h3 className="text-4xl mb-2 text-center uppercase">
            Calendar of {formattedMonth}
          </h3>
          <div className="text-right mb-4">
          
            <select
              onChange={handleMonthChange}
              value={format(currentDate, 'yyyy-MM')}
              className="border rounded px-4 py-2"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = addMonths(startOfMonth(new Date()), i);
                return (
                  <option
                    key={i}
                    value={format(date, 'yyyy-MM')}
                  >
                    {format(date, 'MMMM yyyy')}
                  </option>
                );
              })}
            </select>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <div className="grid grid-cols-7 gap-2">
                {[
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ].map((day) => (
                  <div key={day} className="text-center text-xl font-normal">
                    {day}
                  </div>
                ))}
                {startPaddingDays.map((_, index) => (
                  <div key={`padding-${index}`} />
                ))}
                {daysInMonth.map((date, index) => {
                  const delay = (index + 0.5) * 0.2;

                  return (
                    <motion.div
                      key={date}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay }}
                      className={`p-2 rounded-md hover:shadow-2xl bg-green-500 transition-all cursor-pointer hover:bg-green-700 hover:text-white ${
                        isSameDay(date, new Date())
                          ? 'bg-green-700 hover:animate-none text-white animate-pulse'
                          : ''
                      }`}
                      onClick={() => handleDateClick(date)}
                    >
                      <div className="text-2xl">{format(date, 'd')}</div>
                      <div className="text-sm px-2 overflow-hidden h-[60px]">
                        {events[format(date, 'yyyy-MM-dd')]}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
          {selectedDate && userRole === 'admin' && (
            <div>
              <div className="mt-4 text-2xl ml-5">
                Add event on {formattedDate}
              </div>
              <div className="my-1 text-lg w-full flex">
                <input
                  type="text"
                  value={eventText}
                  onChange={(e) => setEventText(e.target.value)}
                  className="border w-full px-5 rounded-l-lg"
                  placeholder="Event title"
                  maxLength={64}
                />
                <button
                  onClick={handleAddEvent}
                  className="bg-green-600 hover:bg-green-500 text-white w-[150px] px-4 py-1 rounded-r-lg"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto px-4 pb-4">
          <h3 className="text-4xl mb-2 text-center uppercase">
            Calendar of {formattedMonth}
          </h3>
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {[
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
              ].map((day) => (
                <div key={day} className="text-center text-xl font-normal">
                  {day}
                </div>
              ))}
              {startPaddingDays.map((_, index) => (
                <div key={`padding-${index}`} />
              ))}
              {daysInMonth.map((date, index) => {
                const delay = (index + 0.5) * 0.1;

                return (
                  <motion.div
                    key={date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay }}
                    className={`p-2 rounded-md hover:shadow-2xl bg-green-500 transition-all hover:bg-green-700 hover:text-white ${
                      isSameDay(date, new Date())
                        ? 'hover:animate-none bg-green-700 text-white animate-pulse'
                        : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="text-2xl">{format(date, 'd')}</div>
                    <div className="text-sm px-2 overflow-hidden h-[60px]">
                      {events[format(date, 'yyyy-MM-dd')]}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendar;
