import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import GrammarQuizzesPage from './pages/GrammarQuizzesPage';
import AccuracyAssessmentToolPage from './pages/AccuracyAssessmentToolPage';
import AssignmentTrackingPage from './pages/AssignmentTrackingPage';
import GeneralTranscriptionCoursePage from './pages/GeneralTranscriptionCoursePage';
import LegalTranscriptionCoursePage from './pages/LegalTranscriptionCoursePage';
import CartPage from './pages/CartPage';
import ComingSoonPage from './pages/ComingSoonPage';
import LegalTranscriptionTipsPage from './pages/LegalTranscriptionTipsPage';
import TipsAndTricksPage from './pages/TipsAndTricksPage';
import PracticeTranscriptionPage from './pages/PracticeTranscriptionPage';
import VerbatimPage from './pages/VerbatimPage';
import FreeEbookPage from './pages/FreeEbookPage';
import JobBoardPage from './pages/JobBoardPage';
import DiscussionBoardPage from './pages/DiscussionBoardPage';
import ProgressTrackingPage from './pages/ProgressTrackingPage';
import SchedulePage from './pages/SchedulePage';
import SettingsPage from './pages/SettingsPage';
import CourseLessonsPage from './pages/CourseLessonsPage';
import LessonPlayerPage from './pages/LessonPlayerPage';
import MyPurchasesPage from './pages/MyPurchasesPage';
import UpdatesPage from './pages/UpdatesPage';
import './App.css';
import './styles/Dashboard.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/resources/quizzes" element={<GrammarQuizzesPage />} />
        <Route path="/tools/accuracy" element={<AccuracyAssessmentToolPage />} />
        <Route path="/resources/assignments" element={<AssignmentTrackingPage />} />
        <Route path="/courses/general" element={<GeneralTranscriptionCoursePage />} />
        <Route path="/courses/legal" element={<LegalTranscriptionCoursePage />} />
        <Route path="/courses/:courseId/lessons" element={<CourseLessonsPage />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPlayerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/progress" element={<ProgressTrackingPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/tools/job-board" element={<JobBoardPage />} />
        <Route path="/tools/discussions" element={<DiscussionBoardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/resources/tips" element={<LegalTranscriptionTipsPage />} />
        <Route path="/resources/tips-and-tricks" element={<TipsAndTricksPage />} />
        <Route path="/resources/practice" element={<PracticeTranscriptionPage />} />
        <Route path="/resources/verbatim" element={<VerbatimPage />} />
         <Route path="/resources/ebooks" element={<FreeEbookPage />} />
         <Route path="/purchases" element={<MyPurchasesPage />} />
         <Route path="/updates" element={<UpdatesPage />} />
         <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
