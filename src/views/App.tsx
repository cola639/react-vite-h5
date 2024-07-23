import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from 'routes';
import VConsole from 'vconsole';

function App() {
  useEffect(() => {
    import.meta.env.VITE_VCONSOLE === 'open' && new VConsole();

    return () => {};
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  );
}

export default App;
