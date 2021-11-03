import { useEffect, useState } from 'react';

import axios from 'axios';

import { useGlobalState } from '../context/alarmscontext';

const URL = process.env.REACT_APP_FAKE_SERVER_URL;
const countUrl = `${process.env.REACT_APP_FAKE_SERVER_URL}/alarms/count`;

const useAlarmList = (params) => {
  const [state, setState] = useGlobalState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getAlarmList = async () => {
    setIsLoading(true);
    try {
      const requests = [`${URL}/${params}`, countUrl].map(
        (endPoint) =>
          axios({
            method: 'get',
            url: endPoint,
            headers: {
              'Content-Type': 'application/json',
            },
          }).catch((err) =>
            console.log(err, 'something went wrong')
          )
      );
      const [alarmList, count] = await axios.all(requests);
      if (alarmList && count) {
        setTimeout(() => setIsLoading(false), 500);
        setState({
          ...state,
          alarms: alarmList.data,
          totalAlarmsCount: alarmList.data.length,
          activeAlarmsCount: count.data,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      throw new Error(
        `Error when triying to get data`,
        error
      );
    }
  };

  useEffect(() => getAlarmList(), [params]);

  return {
    isLoading,
    isError,
  };
};

export default useAlarmList;
