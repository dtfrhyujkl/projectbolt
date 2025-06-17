import React, { useState, useEffect } from 'react';
import { User, Users, BookOpen, Calendar, MapPin, GraduationCap, Building2, Mail, Phone, CheckCircle, XCircle, Clock, Eye, UserCheck, UserX, BarChart3, FileText, LogOut, ArrowLeft, Brain } from 'lucide-react';
import { medicalCollegesByState, indianStates } from './data/medicalColleges';

interface StudentApplication {
  id: string;
  name: string;
  age: number;
  state: string;
  college: string;
  designation: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
  uniqueId: string;
}

interface SlotBooking {
  id: string;
  studentId: string;
  date: string;
  time: string;
  subject: string;
  status: 'booked' | 'completed' | 'cancelled';
}

function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'userType' | 'studentRegister' | 'studentLogin' | 'studentDashboard' | 'adminLogin' | 'adminDashboard' | 'bookSlot'>('welcome');
  const [userType, setUserType] = useState<'student' | 'admin' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<StudentApplication | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    state: '',
    college: '',
    designation: 'student-mbbs',
    address: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [adminLoginData, setAdminLoginData] = useState({
    username: '',
    password: ''
  });

  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<StudentApplication | null>(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    subject: 'neuroanatomy'
  });

  // Load data from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem('netsApplications');
    if (savedApplications) {
      try {
        const parsedApplications = JSON.parse(savedApplications);
        setApplications(parsedApplications);
        console.log('Loaded applications:', parsedApplications);
      } catch (error) {
        console.error('Error parsing saved applications:', error);
        setApplications([]);
      }
    }
  }, []);

  // Save applications to localStorage
  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem('netsApplications', JSON.stringify(applications));
      console.log('Saved applications:', applications);
    }
  }, [applications]);

  const generateUniqueId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '25AIIMS-';
    for (let i = 0; i < 6; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  };

  const handleStudentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Check if email already exists
    const existingApplication = applications.find(app => app.email.toLowerCase() === formData.email.toLowerCase());
    if (existingApplication) {
      alert('An application with this email already exists!');
      return;
    }

    const newApplication: StudentApplication = {
      id: Date.now().toString(),
      uniqueId: generateUniqueId(),
      name: formData.name,
      age: parseInt(formData.age),
      state: formData.state,
      college: formData.college,
      designation: formData.designation,
      address: formData.address,
      email: formData.email.toLowerCase(), // Store email in lowercase
      phone: formData.phone,
      password: formData.password,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };

    setApplications(prev => {
      const updated = [...prev, newApplication];
      console.log('Adding new application:', newApplication);
      return updated;
    });
    
    // Reset form
    setFormData({
      name: '',
      age: '',
      state: '',
      college: '',
      designation: 'student-mbbs',
      address: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });

    alert(`Application submitted successfully! Your Student ID is: ${newApplication.uniqueId}. Please wait for admin approval before logging in.`);
    setCurrentView('welcome');
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Login attempt:', loginData);
    console.log('Available applications:', applications);
    
    const application = applications.find(app => {
      const emailMatch = app.email.toLowerCase() === loginData.email.toLowerCase();
      const passwordMatch = app.password === loginData.password;
      console.log(`Checking app ${app.email}: email match: ${emailMatch}, password match: ${passwordMatch}, status: ${app.status}`);
      return emailMatch && passwordMatch;
    });

    if (!application) {
      alert('Invalid email or password! Please check your credentials.');
      return;
    }

    if (application.status === 'pending') {
      alert('Your application is still pending approval. Please wait for admin review.');
      return;
    }

    if (application.status === 'rejected') {
      alert('Your application has been rejected. Please contact administration.');
      return;
    }

    console.log('Login successful for:', application);
    setCurrentUser(application);
    setIsLoggedIn(true);
    setCurrentView('studentDashboard');
    setLoginData({ email: '', password: '' });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminLoginData.username === 'admin' && adminLoginData.password === 'admin123') {
      setIsAdmin(true);
      setIsLoggedIn(true);
      setCurrentView('adminDashboard');
      setAdminLoginData({ username: '', password: '' });
    } else {
      alert('Invalid admin credentials!');
    }
  };

  const handleApplicationReview = (applicationId: string, status: 'approved' | 'rejected') => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status, reviewedAt: new Date().toISOString() }
        : app
    ));
    setSelectedApplication(null);
    alert(`Application ${status} successfully!`);
  };

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking: SlotBooking = {
      id: Date.now().toString(),
      studentId: currentUser!.id,
      date: bookingData.date,
      time: bookingData.time,
      subject: bookingData.subject,
      status: 'booked'
    };

    // Save booking (you can extend this to use localStorage)
    alert(`Slot booked successfully for ${bookingData.subject} on ${bookingData.date} at ${bookingData.time}`);
    setBookingData({ date: '', time: '', subject: 'neuroanatomy' });
    setCurrentView('studentDashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser(null);
    setCurrentView('welcome');
  };

  const availableColleges = formData.state ? medicalCollegesByState[formData.state] || [] : [];
  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');

  // Welcome Screen
  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-white/20">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <img 
                src="/nets.jpg" 
                alt="NETS Logo" 
                className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-yellow-400/30"
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">
              Welcome to NETS
            </h1>
            <p className="text-gray-700 font-medium text-lg mb-2">Neuro Engineering and Training School</p>
            <p className="text-sm text-gray-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Advanced Neurological Engineering Platform
            </p>
          </div>
          
          <button
            onClick={() => setCurrentView('userType')}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // User Type Selection
  if (currentView === 'userType') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-10">
            <button
              onClick={() => setCurrentView('welcome')}
              className="absolute top-6 left-6 p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-white/50"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-20 h-20 mx-auto mb-6">
              <img 
                src="/nets.jpg" 
                alt="NETS Logo" 
                className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-yellow-400/30"
              />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">
              Choose Your Role
            </h2>
            <p className="text-gray-700 text-lg">Select how you want to access NETS</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <button
              onClick={() => {
                setUserType('student');
                setCurrentView('studentRegister');
              }}
              className="group p-10 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl hover:border-blue-400 hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300 shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student</h3>
              <p className="text-gray-700 leading-relaxed">Register as a student to access neuro engineering courses and advanced training programs</p>
            </button>

            <button
              onClick={() => {
                setUserType('admin');
                setCurrentView('adminLogin');
              }}
              className="group p-10 bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-200 rounded-2xl hover:border-purple-400 hover:from-purple-100 hover:to-pink-200 transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-purple-600 group-hover:to-pink-700 transition-all duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Administrator</h3>
              <p className="text-gray-700 leading-relaxed">Manage student applications and oversee the neuro engineering training programs</p>
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Already have an account? 
              <button
                onClick={() => setCurrentView('studentLogin')}
                className="text-blue-600 hover:text-blue-700 font-semibold ml-2 underline decoration-2 underline-offset-2"
              >
                Student Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Student Registration
  if (currentView === 'studentRegister') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-10">
            <button
              onClick={() => setCurrentView('userType')}
              className="absolute top-6 left-6 p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-white/50"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-20 h-20 mx-auto mb-6">
              <img 
                src="/nets.jpg" 
                alt="NETS Logo" 
                className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-yellow-400/30"
              />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">
              Student Registration
            </h2>
            <p className="text-gray-700 text-lg">Apply to join NETS - Neuro Engineering and Training School</p>
          </div>

          <form onSubmit={handleStudentRegister} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <User className="w-4 h-4 inline mr-2 text-blue-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 inline mr-2 text-blue-600" />
                  Age
                </label>
                <input
                  type="number"
                  required
                  min="18"
                  max="65"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                  placeholder="Enter your age"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <Mail className="w-4 h-4 inline mr-2 text-blue-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <Phone className="w-4 h-4 inline mr-2 text-blue-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 inline mr-2 text-blue-600" />
                State
              </label>
              <select
                required
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value, college: '' }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
              >
                <option value="">Select your state</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {availableColleges.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <Building2 className="w-4 h-4 inline mr-2 text-blue-600" />
                  Medical College
                </label>
                <select
                  required
                  value={formData.college}
                  onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                >
                  <option value="">Select your college</option>
                  {availableColleges.map(college => (
                    <option key={college.name} value={college.name}>
                      {college.name} - {college.city} ({college.type})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <GraduationCap className="w-4 h-4 inline mr-2 text-blue-600" />
                Designation
              </label>
              <select
                required
                value={formData.designation}
                onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
              >
                <option value="student-mbbs">Student - MBBS</option>
                <option value="jr">Junior Resident</option>
                <option value="sr">Senior Resident</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 inline mr-2 text-blue-600" />
                Address
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={4}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 resize-none"
                placeholder="Enter your complete address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                  placeholder="Create a password"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-5 px-6 rounded-2xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Student Login
  if (currentView === 'studentLogin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <button
              onClick={() => setCurrentView('userType')}
              className="absolute top-6 left-6 p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-white/50"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-20 h-20 mx-auto mb-6">
              <img 
                src="/nets.jpg" 
                alt="NETS Logo" 
                className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-yellow-400/30"
              />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Student Login
            </h2>
            <p className="text-gray-700">Access your NETS account</p>
          </div>

          <form onSubmit={handleStudentLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentView('studentRegister')}
                className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-2"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Login
  if (currentView === 'adminLogin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <button
              onClick={() => setCurrentView('userType')}
              className="absolute top-6 left-6 p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-white/50"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-20 h-20 mx-auto mb-6">
              <img 
                src="/nets.jpg" 
                alt="NETS Logo" 
                className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-purple-400/30"
              />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Admin Login
            </h2>
            <p className="text-gray-700">Access NETS administration panel</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                required
                value={adminLoginData.username}
                onChange={(e) => setAdminLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/70"
                placeholder="Enter admin username"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={adminLoginData.password}
                onChange={(e) => setAdminLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/70"
                placeholder="Enter admin password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Login as Admin
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 bg-gray-100 rounded-lg p-2">
              Demo credentials: admin / admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Student Dashboard
  if (currentView === 'studentDashboard' && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <img 
                    src="/nets.jpg" 
                    alt="NETS Logo" 
                    className="w-full h-full rounded-full object-cover shadow-md ring-2 ring-yellow-400/30"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    NETS Dashboard
                  </h1>
                  <p className="text-sm text-gray-600">Neuro Engineering and Training School</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Welcome, {currentUser.name}</p>
                  <p className="text-xs text-blue-600 font-mono">{currentUser.uniqueId}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-blue-600" />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Student ID</p>
                      <p className="font-bold text-blue-600 font-mono text-lg">{currentUser.uniqueId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Name</p>
                      <p className="font-semibold text-gray-900">{currentUser.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Age</p>
                      <p className="font-semibold text-gray-900">{currentUser.age}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Designation</p>
                      <p className="font-semibold text-gray-900 capitalize">{currentUser.designation.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">State</p>
                      <p className="font-semibold text-gray-900">{currentUser.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">College</p>
                      <p className="font-semibold text-gray-900">{currentUser.college}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-purple-600" />
                  Quick Actions
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setCurrentView('bookSlot')}
                    className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 text-left transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <Calendar className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Book Training Slot</h3>
                    <p className="text-sm text-gray-600">Schedule your neuro engineering training session</p>
                  </button>
                  
                  <div className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl text-left opacity-75 shadow-md">
                    <FileText className="w-10 h-10 text-gray-400 mb-4" />
                    <h3 className="font-bold text-gray-900 text-lg mb-2">View Progress</h3>
                    <p className="text-sm text-gray-600">Track your learning progress</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Account Status
                </h3>
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Approved & Active</span>
                </div>
                <p className="text-green-100 text-sm">
                  Your application was approved on {new Date(currentUser.reviewedAt || currentUser.appliedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-500 mr-3" />
                    <span className="text-sm text-gray-700">{currentUser.phone}</span>
                  </div>
                  <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-gray-500 mr-3 mt-0.5" />
                    <span className="text-sm text-gray-700">{currentUser.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Book Slot
  if (currentView === 'bookSlot' && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentView('studentDashboard')}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors mr-4 rounded-lg hover:bg-gray-100"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="w-12 h-12 mr-4">
                  <img 
                    src="/nets.jpg" 
                    alt="NETS Logo" 
                    className="w-full h-full rounded-full object-cover shadow-md ring-2 ring-yellow-400/30"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Book Training Slot
                  </h1>
                  <p className="text-sm text-gray-600">Schedule your neuro engineering session</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-200">
            <form onSubmit={handleBookSlot} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <Brain className="w-4 h-4 inline mr-2 text-purple-600" />
                  Training Subject
                </label>
                <select
                  required
                  value={bookingData.subject}
                  onChange={(e) => setBookingData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                >
                  <option value="neuroanatomy">Neuroanatomy</option>
                  <option value="neurophysiology">Neurophysiology</option>
                  <option value="neuropharmacology">Neuropharmacology</option>
                  <option value="clinical-neurology">Clinical Neurology</option>
                  <option value="neuro-engineering">Neuro Engineering</option>
                  <option value="brain-computer-interface">Brain-Computer Interface</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 inline mr-2 text-blue-600" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingData.date}
                  onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <Clock className="w-4 h-4 inline mr-2 text-green-600" />
                  Preferred Time
                </label>
                <select
                  required
                  value={bookingData.time}
                  onChange={(e) => setBookingData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
                >
                  <option value="">Select time slot</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-5 px-6 rounded-2xl font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Book Training Slot
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (currentView === 'adminDashboard' && isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <img 
                    src="/nets.jpg" 
                    alt="NETS Logo" 
                    className="w-full h-full rounded-full object-cover shadow-md ring-2 ring-purple-400/30"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    NETS Admin Panel
                  </h1>
                  <p className="text-sm text-gray-600">Neuro Engineering and Training School</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-4 bg-yellow-100 rounded-xl">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 font-medium">Pending Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{pendingApplications.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-4 bg-green-100 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 font-medium">Approved Students</p>
                  <p className="text-3xl font-bold text-gray-900">{approvedApplications.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-4 bg-blue-100 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 font-medium">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Applications</h2>
              <p className="text-gray-600">Review and manage student applications</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">College</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Applied</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{application.name}</div>
                          <div className="text-sm text-gray-600">{application.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{application.uniqueId}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{application.college}</div>
                        <div className="text-sm text-gray-600">{application.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                          application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {application.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedApplication(application)}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded hover:bg-blue-50"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {application.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApplicationReview(application.id, 'approved')}
                                className="text-green-600 hover:text-green-900 transition-colors p-1 rounded hover:bg-green-50"
                                title="Approve"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleApplicationReview(application.id, 'rejected')}
                                className="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
                                title="Reject"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {applications.length === 0 && (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No applications submitted yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
              <div className="p-8 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">Application Details</h3>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-6 text-lg">Personal Information</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">Student ID</p>
                        <p className="font-mono text-blue-600 font-bold">{selectedApplication.uniqueId}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">Name</p>
                        <p className="font-semibold text-gray-900">{selectedApplication.name}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">Age</p>
                        <p className="font-semibold text-gray-900">{selectedApplication.age}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">Designation</p>
                        <p className="font-semibold text-gray-900 capitalize">{selectedApplication.designation.replace('-', ' ')}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-6 text-lg">Contact & Location</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">Email</p>
                        <p className="font-semibold text-gray-900">{selectedApplication.email}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">Phone</p>
                        <p className="font-semibold text-gray-900">{selectedApplication.phone}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">State</p>
                        <p className="font-semibold text-gray-900">{selectedApplication.state}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 font-medium">College</p>
                        <p className="font-semibold text-gray-900">{selectedApplication.college}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Address</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{selectedApplication.address}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Application Status</h4>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-full ${
                      selectedApplication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedApplication.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedApplication.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      Applied: {new Date(selectedApplication.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {selectedApplication.status === 'pending' && (
                  <div className="mt-10 flex space-x-4">
                    <button
                      onClick={() => {
                        handleApplicationReview(selectedApplication.id, 'approved');
                        setSelectedApplication(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <CheckCircle className="w-5 h-5 inline mr-2" />
                      Approve Application
                    </button>
                    <button
                      onClick={() => {
                        handleApplicationReview(selectedApplication.id, 'rejected');
                        setSelectedApplication(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <XCircle className="w-5 h-5 inline mr-2" />
                      Reject Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default App