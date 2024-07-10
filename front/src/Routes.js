import { Route, Routes } from 'react-router-dom';

import HomePage from './components/home';
import Login from './components/student/studentlogin';
import Signup from './components/student/studentsignup';
import UserHome from './components/student/UserHome';
import Dashboard from './components/student/Dashboard';
import AboutUs from './components/student/AboutUs';
import ContactUs from './components/student/ContactUs';
import Certificates from './components/student/CertificateRequest';
import FeeDetails from './components/student/FeeDetails';
import ScholarshipDetails from './components/student/ScholarshipDetails';
import Reminders from './components/student/reminders';
import CertificateRecieve from './components/student/CertificateRecieve';
import SForgotPassword from './components/student/StudentForgot';

import OfficerSignup from './components/officer/OfficerSignup';
import Officerlogin from './components/officer/Officerlogin';
import DataEntryForm from './components/officer/DataEditing';
import DataViewEdit from './components/officer/DataTable';
import FeeReminders from './components/officer/FeeReminders';
import NoticeUpdates from './components/officer/NoticeUpdates';
import OfficeHome from './components/officer/OfficeHome';
import PaymentAndReminders from './components/officer/PaymentAndReminders';
import OForgotPassword from './components/officer/OfficerForgot';
import CertificateDistribution from './components/officer/CertificateDistribution';
import ApprovedAndRemoved from './components/officer/ApprovedAndRemoved';
import FeePayment from './components/officer/FeePayment';
import StudentListPage from './components/officer/StudentList';

import AdminDashboard from './components/admin/AdminDashboard';
import AForgotPassword from './components/admin/AdminForgot';
import AdminSignup from './components/admin/AdminSignup';
import AdminLogin from './components/admin/AdminLogin';
import AdminOfficersPage from './components/admin/AdminOfficersPage';

import AssignTutor from './components/hod/Assigntutor';

import FacultyHome from './components/faculty/FacultyHome';
import FaculitySignup from './components/faculty/faculitysignup';
import FaculityLogin from './components/faculty/faculitylogin';
import InternalMarksForm from './components/faculty/InternalMarksForm';
import AttendanceForm from './components/faculty/AttendanceForm';
import AssignmentForm from './components/faculty/AssignmentForm';
import FForgotPassword from './components/faculty/FacultyForgot';
import AttendanceTable from './components/faculty/AttendanceTable';

import TutorHome from './components/tutor/TutorHome';
import ClasstutorSignup from './components/tutor/classtututorsignup';
import ClasstutorLogin from './components/tutor/classtutorlogin';
import TForgotPassword from './components/tutor/TutorForgot';
import Tutorstudentlist from './components/tutor/tutorstudentlist';
import StudentPerformancePage from './components/tutor/Performance';
import TutorUpdates from './components/tutor/Updates';

import HodHome from './components/hod/HodHome';
import HodSignup from './components/hod/hodsignup';
import HodLogin from './components/hod/hodlogin';
import HForgotPassword from './components/hod/hodForgot';
import CertificateApproval from './components/hod/CertificateApproval';
import HodStudenlist from './components/hod/HstudentsDetails';
import SubjectAdd from './components/hod/SubjectAddition';
import HodPerformancePage from './components/hod/HodPerformance';
import HodTeachersPage from './components/hod/AdminTeachersPage';

import PrinciHome from './components/principal/PrinciHome';
import PrincipalSignup from './components/principal/principalsignup';
import PrincipalLogin from './components/principal/principallogin';
import PForgotPassword from './components/principal/PrinciForgot';
import Pstudents from './components/principal/StudentsList';
import Pteachers from './components/principal/TeachersList';
import Pofficers from './components/principal/OfficersList';
import Hodassign from './components/principal/hodassign';
import SRequests from './components/principal/StudentRequest';

import ProtectedRoute from './ProtectedRoutes';

function RoutesComp() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/studentlogin' element={<Login />} />
        <Route path='/studentsignup' element={<Signup />} />
        <Route path='/officersignup' element={<OfficerSignup />} />
        <Route path='/officerlogin' element={<Officerlogin />} />
        <Route path='/facultylogin' element={<FaculityLogin />} />
        <Route path='/faculitysignup' element={<FaculitySignup />} />
        <Route path='/classtutorlogin' element={<ClasstutorLogin />} />
        <Route path='/classtutorsignup' element={<ClasstutorSignup />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/adminsignup' element={<AdminSignup />} />
        <Route path='/hodlogin' element={<HodLogin />} />
        <Route path='/hodsignup' element={<HodSignup />} />
        <Route path="/principallogin" element={<PrincipalLogin />} />
        <Route path="/principalsignup" element={<PrincipalSignup />} />
        <Route path="/office" element={<ProtectedRoute allowedRoles={['officer']}> <OfficeHome /></ProtectedRoute>} />
        <Route path="/data-editing" element={<ProtectedRoute allowedRoles={['officer']}><DataEntryForm /></ProtectedRoute>} />
        <Route path="/data-table" element={<ProtectedRoute allowedRoles={['officer']}><DataViewEdit /></ProtectedRoute>} />
        <Route path="/fee-reminders" element={<ProtectedRoute allowedRoles={['officer']}><FeeReminders /></ProtectedRoute>} />
        <Route path="/notice-updates" element={<ProtectedRoute allowedRoles={['officer']}><NoticeUpdates /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><Dashboard /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute allowedRoles={['student']}><UserHome /></ProtectedRoute>} />
        <Route path="/about-us" element={<ProtectedRoute allowedRoles={['student']}><AboutUs /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute allowedRoles={['student']}><ContactUs /></ProtectedRoute>} />
        <Route path="/certificates-user" element={<ProtectedRoute allowedRoles={['student']}><Certificates /></ProtectedRoute>} />
        <Route path="/certificate-distribution" element={<ProtectedRoute allowedRoles={['officer']}><CertificateDistribution /></ProtectedRoute>} />
        <Route path="/fee-details" element={<ProtectedRoute allowedRoles={['student']}><FeeDetails /></ProtectedRoute>} />
        <Route path="/scholarships" element={<ProtectedRoute allowedRoles={['student']}><ScholarshipDetails /></ProtectedRoute>} />
        <Route path="/dash" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/fchome" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyHome /></ProtectedRoute>} />
        <Route path="/thome" element={<ProtectedRoute allowedRoles={['tutor']}><TutorHome /></ProtectedRoute>} />
        <Route path="/hodhome" element={<ProtectedRoute allowedRoles={['hod']}><HodHome /></ProtectedRoute>} />
        <Route path="/phome" element={<ProtectedRoute allowedRoles={['principal']}><PrinciHome /></ProtectedRoute>} />
        <Route path="/rem" element={<ProtectedRoute allowedRoles={['student']}><Reminders /></ProtectedRoute>} />
        <Route path="/int" element={<ProtectedRoute allowedRoles={['faculty']}><InternalMarksForm /></ProtectedRoute>} />
        <Route path="/att" element={<ProtectedRoute allowedRoles={['faculty']}><AttendanceForm /></ProtectedRoute>} />
        <Route path="/ast" element={<ProtectedRoute allowedRoles={['faculty']}><AssignmentForm /></ProtectedRoute>} />
        <Route path="/cert" element={<ProtectedRoute allowedRoles={['student']}><CertificateRecieve /></ProtectedRoute>} />
        <Route path="/officer-details" element={<ProtectedRoute allowedRoles={['admin']}><AdminOfficersPage /></ProtectedRoute>} />
       
        <Route path="/payment" element={<ProtectedRoute allowedRoles={['officer']}><PaymentAndReminders /></ProtectedRoute>} />
        <Route path="/aforgot" element={<AForgotPassword />} />
        <Route path="/fforgot" element={<FForgotPassword />} />
        <Route path="/hforgot" element={<HForgotPassword />} />
        <Route path="/oforgot" element={<OForgotPassword />} />
        <Route path="/pforgot" element={<PForgotPassword />} />
        <Route path="/sforgot" element={<SForgotPassword />} />
        <Route path="/tforgot" element={<TForgotPassword />} />
        <Route path="/certificate-approval" element={<ProtectedRoute allowedRoles={['hod']}><CertificateApproval /></ProtectedRoute>} />
        <Route path="/ar" element={<ProtectedRoute allowedRoles={['officer']}><ApprovedAndRemoved /></ProtectedRoute>} />
        <Route path="/pstudents" element={<ProtectedRoute allowedRoles={['principal']}><Pstudents /></ProtectedRoute>} />
        <Route path="/pteachers" element={<ProtectedRoute allowedRoles={['principal']}><Pteachers /></ProtectedRoute>} />
        <Route path="/pOffice" element={<ProtectedRoute allowedRoles={['principal']}><Pofficers /></ProtectedRoute>} />
        <Route path="/hodassign" element={<ProtectedRoute allowedRoles={['principal']}><Hodassign /></ProtectedRoute>} />
        <Route path="/hstudents" element={<ProtectedRoute allowedRoles={['hod']}><HodStudenlist /></ProtectedRoute>} />
        <Route path="/feepayment" element={<ProtectedRoute allowedRoles={['officer']}><FeePayment /></ProtectedRoute>} />
        <Route path="/subject" element={<ProtectedRoute allowedRoles={['hod']}><SubjectAdd /></ProtectedRoute>} />
        <Route path="/asigntutor" element={<ProtectedRoute allowedRoles={['hod']}><AssignTutor /></ProtectedRoute>} />
        <Route path="/tstudents" element={<ProtectedRoute allowedRoles={['tutor']}><Tutorstudentlist /></ProtectedRoute>} />
        <Route path="/sdata" element={<ProtectedRoute allowedRoles={['officer']}><StudentListPage /></ProtectedRoute>} />
        <Route path="/perf" element={<ProtectedRoute allowedRoles={['tutor']}><StudentPerformancePage /></ProtectedRoute>} />
        <Route path="/upd" element={<ProtectedRoute allowedRoles={['tutor']}><TutorUpdates /></ProtectedRoute>} />
        <Route path="/hperf" element={<ProtectedRoute allowedRoles={['hod']}><HodPerformancePage /></ProtectedRoute>} />
        <Route path="/hodhome" element={<ProtectedRoute allowedRoles={['hod']}><HodHome/></ProtectedRoute>} />
        <Route path="/teacher-details" element={<ProtectedRoute allowedRoles={['hod']}><HodTeachersPage /></ProtectedRoute>} />
        <Route path="/att-table" element={<ProtectedRoute allowedRoles={['faculty']}><AttendanceTable /></ProtectedRoute>} />
        <Route path="/srequests" element={<ProtectedRoute allowedRoles={['principal']}><SRequests /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default RoutesComp;
