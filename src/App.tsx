import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import Layout from '@components/common/Layout/Layout';
import Home from '@Pages/Home/Home';
import Auth from '@Pages/Auth/Auth';
import ProfileSetup from '@Pages/ProfileSetup/ProfileSetup';
import Search from '@Pages/Search/Search';
import Articles from '@Pages/Articles/Articles';
import WriteComment from '@Pages/WriteComment/WriteComment';
import Progress2 from '@/Pages/Articles/WriteComment/CreatePost/Progress2/Progress2';
import GetPost from './Pages/Articles/WriteComment/GetPost';
import Progress3 from './Pages/Articles/WriteComment/CreatePost/Progress3/Progress3';
import Progress4 from './Pages/Articles/WriteComment/CreatePost/Progress4/Progress4';
import Progress5 from './Pages/Articles/WriteComment/CreatePost/Progress5/Progress5';
import Progress6 from './Pages/Articles/WriteComment/CreatePost/Progress6/Progress6';

function App() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/auth', element: <Auth /> },
    { path: '/profile-setup/', element: <ProfileSetup /> },
    { path: '/search', element: <Search /> },
    { path: '/articles/:id', element: <Articles /> },
    { path: '/articles/:id/write-comment', element: <WriteComment />},
    {
      path: '/articles/:id/write-comment/create-post/:number',
      element: <Progress4 />,
    },
    {
      path: '/articles/:id/write-comment/get-post/:number',
      element: <GetPost />,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {routes.map(({ path, element}, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
