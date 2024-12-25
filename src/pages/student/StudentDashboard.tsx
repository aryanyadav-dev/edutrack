import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaCalendarAlt, FaCheckCircle, FaPlus } from 'react-icons/fa';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const motivationalQuotes = [
  "The beautiful thing about learning is that no one can take it away from you.",
  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Don't let what you cannot do interfere with what you can do.",
  "The journey of a thousand miles begins with one step.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It always seems impossible until it’s done.",
  "Success is the sum of small efforts, repeated day in and day out."
];

const DashboardContainer = styled.div`
  background-color: #f9fafb;
  height: 100vh;
  padding: 6rem 1.5rem 2rem;  /* Adjusted padding */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: -10%;
  right: 15%;
  bottom: 0;
  width: 110%;  /* Full width */
  margin-right: -12%; 
  overflow: hidden;
`;

const GreetingHeader = styled.div`
  text-align: left;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  width: 100%;
  max-width: 900px;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: calc(100vh - 200px); 
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const QuoteSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-style: italic;
  color: #4b5563;
`;

const CalendarTaskSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex: 1;
  min-height: 0;
`;

const CalendarSection = styled.div`
  background: #f3f4f6;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CalendarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #111827;
`;

const TaskSection = styled.div`
  background: #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  flex: 1;
  width: 60%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TaskInput = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex: 1;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export function StudentDashboard() {
  const [quote, setQuote] = useState('');
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <DashboardContainer>
      <GreetingHeader>
        {getGreeting()}!
      </GreetingHeader>
      <ContentWrapper>
        <Section>
          <QuoteSection>
            <FaQuoteLeft style={{ marginRight: '8px', color: '#3b82f6' }} />
            <p>{quote}</p>
            <FaQuoteRight style={{ marginLeft: '8px', color: '#3b82f6' }} />
          </QuoteSection>
        </Section>
        <CalendarTaskSection>
          <CalendarSection>
            <CalendarTitle>
              <FaCalendarAlt style={{ marginRight: '8px' }} /> Your Calendar
            </CalendarTitle>
            <Calendar onChange={setDate} value={date} className="react-calendar" />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Selected Date: {date.toDateString()}
            </p>
          </CalendarSection>
          <TaskSection>
            <h3>Tasks</h3>
            <TaskInput>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                style={{ flex: 1, marginRight: '8px', padding: '8px' }}
              />
              <button onClick={addTask} style={{ padding: '8px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px' }}>
                <FaPlus />
              </button>
            </TaskInput>
            <TaskList>
              {tasks.map((task, index) => (
                <TaskItem key={index}>
                  <span>{task}</span>
                  <FaCheckCircle style={{ color: '#10b981', cursor: 'pointer' }} onClick={() => removeTask(index)} />
                </TaskItem>
              ))}
            </TaskList>
          </TaskSection>
        </CalendarTaskSection>
      </ContentWrapper>
    </DashboardContainer>
  );
}
