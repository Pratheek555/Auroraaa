import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import axios from "axios"
import { useState, useEffect } from 'react';
import DateSelect from 'components/dates/DateSelect';
import CompletedTaskChart from './CompletedTaskChart';








const CompletedTask = () => {

  const [average_bpm, setAverage_BPM] = useState();
  const [sessionId, setSessionId] = useState<string>("");



  const token = localStorage.getItem("authToken");

  // Start session and get sessionId
  useEffect(() => {
    const startSession = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/bpm_monitor/start",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSessionId(response.data.session_id);
        console.log("Session ID:", response.data.session_id);
      } catch (error) {
        console.error("Error starting session:", error);
      }
    };

    startSession();
  }, [token]);


  useEffect(() => {
    const fetchAverageBPM = async () => {

      try {
        const response = await axios.get(`http://127.0.0.1:8000/bpm_monitor/${sessionId}/live`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )

        const data = response.data.average_bpm;
        console.log(response.data)
        console.log("Average BPM = " + data)
        setAverage_BPM(data)

      } catch (error) {
        console.log("Error while fetching Average BPM: " + error)
      }

    }

    const intervalId = setInterval(fetchAverageBPM, 5000);
    return () => clearInterval(intervalId);
  })


  return (
    <Paper sx={{ height: 300 }}>

      {/* header */}
      <Stack alignItems="center" spacing={0.6}>

        <Typography variant="body2" color="text.secondary">
          Heart Rates
        </Typography>
      </Stack>

      <Stack mt={1.5} alignItems="center" justifyContent="space-between">
        <Stack alignItems="center" gap={0.875}>
          <Typography variant="h3" fontWeight={600} letterSpacing={1}>
            {average_bpm}
          </Typography>

        </Stack>

        <DateSelect />
      </Stack>

      {/* line chart */}
      <Box height={220}>
        <CompletedTaskChart sx={{ height: '100% !important' }} />
      </Box>
    </Paper>
  );
};

export default CompletedTask;
