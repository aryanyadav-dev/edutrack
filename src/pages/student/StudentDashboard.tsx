import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaCalendarAlt, FaPlus, FaTimes, FaChartLine } from 'react-icons/fa';
import { Calendar } from 'react-calendar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'react-calendar/dist/Calendar.css';
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
  "It always seems impossible until it's done.",
  "Success is the sum of small efforts, repeated day in and day out."
];

const DashboardContainer = styled.div`
  background-color: #f9fafb;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1400px;
  padding: 4rem 0 1.5rem;
  overflow: visible; /* Removed vertical overflow */
`;

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;  /* Only keep horizontal scrolling */
  white-space: nowrap;
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;

    &:hover {
      background: #555;
    }
  }
`;

const MainContentWrapper = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 2000px;
  margin: 0 auto;
  margin-left: 225px; /* Minor adjustment to move content left */
`;

const GreetingHeader = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  width: 100%;
  max-width: 1600px;
  padding-right: 2rem;
  margin-left: 420px; /* Moved more to the right */
`;

const ContentWrapper = styled.div`
  flex: 0 1 65%;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const AnalyticsWrapper = styled.div`
  flex: 0 1 40%;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  height: 100%;
  min-width: 600px;
`;

const Section = styled.div`
  margin-bottom: 1.25rem;
`;

const QuoteSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  font-style: italic;
  color: #4b5563;
  font-size: 0.95rem;
`;

const CalendarTaskSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 0.5rem;
`;

const CalendarSection = styled.div`
  background: #f3f4f6;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const CalendarTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #111827;
`;

const TaskSection = styled.div`
  background: #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  width: 350px;
  display: flex;
  flex-direction: column;
`;

const TaskInput = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  padding: 0.4rem 0.75rem;
  background: #ffffff;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const PriorityBadge = styled.span`
  background-color: ${(props) => (props.priority === 'High' ? '#ef4444' : props.priority === 'Medium' ? '#f59e0b' : '#10b981')};
  color: #ffffff;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.7rem;
  margin-left: 6px;
`;

const ProgressTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #111827;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const StatCard = styled.div`
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;

  h3 {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
`;

export function StudentDashboard() {
  const [quote, setQuote] = useState('');
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const [taskCompletionData, setTaskCompletionData] = useState([
    { day: 'Mon', completed: 0 },
    { day: 'Tue', completed: 0 },
    { day: 'Wed', completed: 0 },
    { day: 'Thu', completed: 0 },
    { day: 'Fri', completed: 0 },
    { day: 'Sat', completed: 0 },
    { day: 'Sun', completed: 0 }
  ]);

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
      setTasks([...tasks, { text: newTask, priority: taskPriority }]);
      setNewTask('');
      setTaskPriority('Low');
      updateTaskCompletionData();
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setTasksCompleted(tasksCompleted + 1);
    updateTaskCompletionData();
  };

  const updateTaskCompletionData = () => {
    const today = new Date().getDay();
    const updatedData = [...taskCompletionData];
    updatedData[today].completed = tasksCompleted;
    setTaskCompletionData(updatedData);
  };

  return (
    <DashboardContainer>
      <GreetingHeader>
        {getGreeting()}!
      </GreetingHeader>
      <ScrollWrapper>
        <MainContentWrapper>
          <ContentWrapper>
            <Section>
              <QuoteSection>
                <FaQuoteLeft style={{ marginRight: '6px', color: '#3b82f6', fontSize: '0.9rem' }} />
                <p>{quote}</p>
                <FaQuoteRight style={{ marginLeft: '6px', color: '#3b82f6', fontSize: '0.9rem' }} />
              </QuoteSection>
            </Section>
            <CalendarTaskSection>
              <CalendarSection>
                <CalendarTitle>
                  <FaCalendarAlt style={{ marginRight: '6px' }} /> Your Calendar
                </CalendarTitle>
                <Calendar onChange={setDate} value={date} className="react-calendar" />
                <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#6b7280' }}>
                  Selected Date: {date.toDateString()}
                </p>
              </CalendarSection>
              <TaskSection>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Tasks</h3>
                <TaskInput>
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    style={{ flex: 1, marginRight: '6px', padding: '6px', fontSize: '0.9rem' }}
                  />
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    style={{ marginRight: '6px', padding: '6px', fontSize: '0.9rem' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <button
                    onClick={addTask}
                    style={{ padding: '6px 10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px' }}
                  >
                    <FaPlus size={12} />
                  </button>
                </TaskInput>
                <TaskList>
                  {tasks.map((task, index) => (
                    <TaskItem key={index}>
                      <span>{task.text} <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge></span>
                      <FaTimes
                        style={{ color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem' }}
                        onClick={() => removeTask(index)}
                      />
                    </TaskItem>
                  ))}
                </TaskList>
              </TaskSection>
            </CalendarTaskSection>
          </ContentWrapper>

          <AnalyticsWrapper>
            <ProgressTitle>
              <FaChartLine style={{ marginRight: '6px' }} /> Analytics & Progress
            </ProgressTitle>

            <StatGrid>
              <StatCard>
                <h3>Total Tasks</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  {tasks.length}
                </p>
                <p style={{ fontSize: '0.8rem' }}>Total Tasks</p>
              </StatCard>
              <StatCard>
                <h3>Tasks Completed</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                  {tasksCompleted}
                </p>
                <p style={{ fontSize: '0.8rem' }}>Completed Tasks</p>
              </StatCard>
            </StatGrid>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Tasks Completion Per Day</h3>
              <div style={{ width: '100%', height: '250px' }}>
                <LineChart
                  width={500}
                  height={250}
                  data={taskCompletionData}
                  margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </div>
            </div>
          </AnalyticsWrapper>
        </MainContentWrapper>
      </ScrollWrapper>
    </DashboardContainer>
  );
}
