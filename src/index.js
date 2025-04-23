import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from 'layouts/admin';
import UserLayout from 'layouts/user';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import "./index.css"
import { ClerkProvider, useUser, useAuth } from '@clerk/clerk-react';
import ClerkToast from "components/ui/clerkToast"

// Centralized function to validate and retrieve user
function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isSignedIn, user: clerkUser } = useUser();
  const { signOut } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      // Set the user role to 'user' and store it in localStorage
      const userData = { role: 'user', ...clerkUser };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
  
      // Only redirect to /default if the current path is /auth/sign-in or /clerk-sign-in
      if (window.location.pathname === '/auth/sign-in' || window.location.pathname === '/clerk-sign-in') {
        navigate('/default');
      }
    } else {
      const storedUser = getUser();
      setUser(storedUser);
  
      // Redirect to sign-in if no valid user is found and not already on an auth route
      if (!storedUser && !window.location.pathname.startsWith('/auth')) {
        navigate('/auth/sign-in');
      }
    }
  }, [isSignedIn, clerkUser, navigate]);

  console.log('Validated User:', user);

  return (
    <>
      <ToastContainer />
          <ClerkToast/>
      <Routes>
        {user && user.role ? (
          user.role === 'user' ? (
            <Route path="/*" element={<UserLayout />} />
          ) : user.role === 'superAdmin' ? (
            <Route path="/*" element={<AdminLayout />} />
          ) : user.role === 'admin' ? (
            <Route path="/*" element={<AdminLayout />} />
          ) : null
        ) : (
          <Route path="/*" element={<AuthLayout />} />
        )}
      </Routes>
    </>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            <ClerkProvider publishableKey="pk_test_c21vb3RoLWxvbmdob3JuLTY5LmNsZXJrLmFjY291bnRzLmRldiQ">
              <Router>
                <App />
              </Router>
            </ClerkProvider>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import 'assets/css/App.css';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
// import AuthLayout from './layouts/auth';
// import AdminLayout from 'layouts/admin';
// import UserLayout from 'layouts/user';
// import { ChakraProvider } from '@chakra-ui/react';
// import theme from 'theme/theme';
// import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Provider } from 'react-redux';
// import { store, persistor } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import './index.css';
// import { ClerkProvider, useUser, useAuth } from '@clerk/clerk-react';

// // Centralized function to validate and retrieve user
// function getUser() {
//   try {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user || null;
//   } catch (error) {
//     console.error('Error parsing user from localStorage:', error);
//     return null;
//   }
// }

// // Default Page Component
// const DefaultPage = () => {
//   return (
//     <div>
//       <h1>Welcome to the Default Page</h1>
//       <p>You have successfully logged in as a user.</p>
//     </div>
//   );
// };

// function App() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const { isLoaded, isSignedIn, user: clerkUser } = useAuth();

//   useEffect(() => {
//     if (isLoaded) {
//       if (isSignedIn && clerkUser) {
//         // Assign a default role to the user
//         const userWithRole = { ...clerkUser, role: 'user' };
//         localStorage.setItem('user', JSON.stringify(userWithRole));
//         setUser(userWithRole);
//         navigate('/default'); // Redirect to /default after login
//       } else {
//         const storedUser = getUser();
//         setUser(storedUser);

//         // Redirect if no valid user is found
//         // if (!storedUser) {
//         //   navigate('/auth/sign-in'); // Redirect to authentication layout
//         // }
//       }
//     }
//   }, [isLoaded, isSignedIn, clerkUser, navigate]);

//   if (!isLoaded) {
//     return <div>Loading...</div>; // Show a loading spinner while Clerk is loading
//   }

//   return (
//     <>
//        <ToastContainer />
//        <Routes>
//        {user && user.role ? (
//           user.role === 'user' ? (
//             <Route path="/*" element={<UserLayout />} />
//           ) : user.role === 'superAdmin' ? (
//             <Route path="/*" element={<AdminLayout />} />
//           ) : user.role === 'admin' ? (
//             <Route path="/*" element={<AdminLayout />} />
//           ) : null
//         ) : (
//           <Route path="/*" element={<AuthLayout />} />
//         )}
//       </Routes>
//     </>
//   );
// }

// const PUBLISHABLE_KEY = "pk_test_aGVyb2ljLW1vbGUtNzkuY2xlcmsuYWNjb3VudHMuZGV2JA";

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Add your Clerk Publishable Key to the .env file');
// }

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <ChakraProvider theme={theme}>
//         <React.StrictMode>
//           <ThemeEditorProvider>
//             <Router>
//               <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//                 <App />
//               </ClerkProvider>
//             </Router>
//           </ThemeEditorProvider>
//         </React.StrictMode>
//       </ChakraProvider>
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root')
// );

// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import 'assets/css/App.css';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import AuthLayout from './layouts/auth';
// import AdminLayout from 'layouts/admin';
// import UserLayout from 'layouts/user';
// import { ChakraProvider } from '@chakra-ui/react';
// import theme from 'theme/theme';
// import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Provider } from 'react-redux';
// import { store, persistor } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import "./index.css"
// import { ClerkProvider, useUser, useAuth } from '@clerk/clerk-react';


// // Centralized function to validate and retrieve user
// function getUser() {
  
//   try {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user || null;
//   } catch (error) {
//     console.error('Error parsing user from localStorage:', error);
//     return null;
//   }
// }

// function App() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
  
  
//   useEffect(() => {
//     const storedUser = getUser();
//     setUser(storedUser);

//     // Redirect if no valid user is found
//     if (!storedUser) {
//       navigate('/auth/sign-in'); // Redirect to authentication layout
//     }
//   }, [navigate]);

//   console.log('Validated User:', user);

//   return (
//     <>
//       <ToastContainer />
//       <Routes>
//       {user && user.role ? (
//   user.role === 'user' ? (
//     <Route path="/*" element={<UserLayout />} />
//   ) : user.role === 'superAdmin' ? (
//     <Route path="/*" element={<AdminLayout />} />
//   ) : user.role === 'admin' ? (
//     <Route path="/*" element={<AdminLayout />} />
//   ) : null
// ) : (
//   <Route path="/*" element={<AuthLayout />} />
// )}
//       </Routes>
//     </>
//   );
// }

// const PUBLISHABLE_KEY = "pk_test_aGVyb2ljLW1vbGUtNzkuY2xlcmsuYWNjb3VudHMuZGV2JA";

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Add your Clerk Publishable Key to the .env file');
// }

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <ChakraProvider theme={theme}>
//         <React.StrictMode>
//           <ThemeEditorProvider>
//             <Router>
//               <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//                 <App />
//               </ClerkProvider>
//             </Router>
//           </ThemeEditorProvider>
//         </React.StrictMode>
//       </ChakraProvider>
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root')
// );
