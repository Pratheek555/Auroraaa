

import { SxProps, useTheme } from "@mui/material";
import { fontFamily } from "theme/typography";
import { useMemo, useState, useEffect } from "react";
import { graphic } from "echarts";
import * as echarts from "echarts/core";
import ReactEchart from "components/base/ReactEchart";
import axios from "axios";

interface CompletedTaskChartProps {
  sx?: SxProps;
}

const CompletedTaskChart = ({ ...rest }: CompletedTaskChartProps) => {
  const theme = useTheme();
  const [sessionId, setSessionId] = useState<string>("");
  const [heartbeatData, setHeartbeatData] = useState<number[]>([]);

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
    if (!sessionId) return;

    const fetchLiveData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/bpm_monitor/${sessionId}/live`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.readings;

        const bpmValues = data.map((item: { bpm: number }) => item.bpm);
        // console.log("Bpm values Length: " + bpmValues.length)
        if (bpmValues.length > 6) {
          setHeartbeatData(bpmValues.slice(bpmValues.length - 7, bpmValues.length - 1));
        }

        //console.log("Updated Heartbeat Data:", bpmValues);
      } catch (error) {
        console.error("Error fetching live data:", error);
      }
    };

    const intervalId = setInterval(fetchLiveData, 5000);
    return () => clearInterval(intervalId);
  }, [sessionId, token]);


  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
      },
      grid: {
        top: 30,
        bottom: 70,
        left: 30,
        right: 0,
      },
      xAxis: {
        type: "category",
        data: heartbeatData.map((_, index) => `Point ${index + 1}`),
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          margin: 10,
          color: theme.palette.text.secondary,
          fontSize: theme.typography.caption.fontSize,
          fontFamily: fontFamily.monaSans,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: theme.palette.text.secondary,
          fontSize: theme.typography.caption.fontSize,
          fontFamily: fontFamily.monaSans,
        },
        splitLine: {
          show: false,
        },
        interval: 20,
        max: 150,
      },
      series: [
        {
          data: heartbeatData, // Use updated heartbeatData
          type: "line",
          showSymbol: false,
          lineStyle: {
            color: theme.palette.secondary.main,
            width: 1.2,
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 194, 255, 0.2)",
              },
              {
                offset: 1,
                color: "rgba(0, 194, 255, 0)",
              },
            ]),
          },
        },
      ],
    }),
    [theme, heartbeatData]
  );

  return <ReactEchart echarts={echarts} option={option} {...rest} />;
};

export default CompletedTaskChart;
