import Grid from '@mui/material/Grid';
import CompletedTask from 'components/sections/dashboard/completed-task';
import OrdersStatus from 'components/sections/dashboard/patient-status';

const Dashboard = () => {
  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>


      <Grid item xs={12} xl={8}>
        <h1>bada boom!</h1>
        <CompletedTask />
      </Grid>

      <Grid item xs={12}>
        <OrdersStatus />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
