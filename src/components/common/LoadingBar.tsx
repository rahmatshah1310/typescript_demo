// // src/components/common/LoadingBar.jsx
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// // Configure NProgress
// NProgress.configure({
//   minimum: 0.3,
//   easing: 'ease',
//   speed: 800,
//   showSpinner: false,
//   trickleSpeed: 200,
// });

// const LoadingBar = () => {
//   const location = useLocation();

//   useEffect(() => {
//     NProgress.start();
    
 
//     const timer = setTimeout(() => {
//       NProgress.done();
//     }, 500);

//     return () => {
//       clearTimeout(timer);
//       NProgress.done();
//     };
//   }, [location.pathname]); 

//   return null;
// };

// export default LoadingBar;