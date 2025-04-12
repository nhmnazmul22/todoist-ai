import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <>
      <div>App Layout</div>
      <Outlet />
    </>
  );
};

export default AppLayout;
