import FullCalendar from '@fullcalendar/react';
import Card from 'components/card/Card';
import { useEffect, useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import { GoDotFill } from 'react-icons/go';
import EventView from 'views/admin/task/eventView';
import MeetingView from 'views/admin/meeting/meetingView';
import CallView from 'views/admin/phoneCall/callView';
import EmailView from 'views/admin/emailHistory/emailView';
import { HasAccess } from '../../../../redux/accessUtils';
import AddEdit from 'views/admin/task/components/AddEdit';

const Calendar = (props) => {
  const { data, fetchData } = props;
  const [eventView, setEventView] = useState(false);
  const [meetingView, setMeetingView] = useState(false);
  const [callView, setCallView] = useState(false);
  const [emailView, setEmailView] = useState(false);
  const [taskInfo, setTaskInfo] = useState();
  const [meetingInfo, setMeetingInfo] = useState();
  const [callInfo, setCallInfo] = useState();
  const [emailInfo, setEmailInfo] = useState();
  const [date, setDate] = useState();
  const [taskAccess, meetingAccess, callAccess, emailAccess] = HasAccess([
    'Tasks',
    'Meetings',
    'Calls',
    'Emails',
  ]);
  const [taskModel, setTaskModel] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [currentView, setCurrentView] = useState('');

  useEffect(() => {
    setCurrentView('dayGridMonth');
  }, []);

  const handleDateClick = (arg) => {
    setTaskModel(true);
    setDate(arg.dateStr);
  };

  const handleEventClick = (info) => {
    if (info.event.url) {
      info.jsEvent.preventDefault();
      window.open(info.event.url);
    }

    if (info?.event?.groupId === 'task') {
      setTaskInfo(info);
      setEventView(true);
    } else if (info?.event?.groupId === 'call') {
      setCallInfo(info);
      setCallView(true);
    } else if (info?.event?.groupId === 'meeting') {
      setMeetingInfo(info);
      setMeetingView(true);
    } else if (info?.event?.groupId === 'email') {
      setEmailInfo(info);
      setEmailView(true);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-6">
        {(taskAccess?.view || user?.role === 'superAdmin') && (
          <AddEdit
            isOpen={taskModel}
            onClose={setTaskModel}
            fetchData={fetchData}
            userAction={'add'}
          />
        )}
        <EventView
          fetchData={fetchData}
          isOpen={eventView}
          onClose={setEventView}
          info={taskInfo}
        />
        <MeetingView
          fetchData={fetchData}
          isOpen={meetingView}
          onClose={setMeetingView}
          info={meetingInfo}
        />
        <CallView
          fetchData={fetchData}
          isOpen={callView}
          onClose={setCallView}
          info={callInfo}
        />
        <EmailView
          fetchData={fetchData}
          isOpen={emailView}
          onClose={setEmailView}
          info={emailInfo}
        />
      </div>

      <div className="flex justify-end space-x-4 mb-4">
        {(callAccess?.create || user?.role === 'superAdmin') && (
          <div className="flex items-center text-sm text-gray-700">
            <GoDotFill className="text-green-500 text-lg mr-2" /> Calls
          </div>
        )}
        {(meetingAccess?.create || user?.role === 'superAdmin') && (
          <div className="flex items-center text-sm text-gray-700">
            <GoDotFill className="text-red-500 text-lg mr-2" /> Meetings
          </div>
        )}
        {(emailAccess?.create || user?.role === 'superAdmin') && (
          <div className="flex items-center text-sm text-gray-700">
            <GoDotFill className="text-blue-500 text-lg mr-2" /> Emails
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
            multiMonthPlugin,
          ]}
          initialView={currentView}
          height="600px"
          dateClick={handleDateClick}
          events={data}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,multiMonthFourMonth',
          }}
          eventClick={handleEventClick}
          buttonText={{
            today: 'Today',
            dayGridMonth: 'Month',
            timeGridWeek: 'Week',
            timeGridDay: 'Day',
            listWeek: 'List',
          }}
          views={{
            multiMonthFourMonth: {
              type: 'multiMonth',
              buttonText: 'Multi Month',
              duration: { months: 4 },
            },
          }}
          eventClassNames="custom-fullcalendar"
        />
      </div>
    </div>
  );
};

export default Calendar;
