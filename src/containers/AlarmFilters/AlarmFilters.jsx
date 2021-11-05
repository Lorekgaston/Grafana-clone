import React, { useState } from 'react';

import { Box } from '@mui/system';
import { Button } from '@mui/material';

import useAlarmList from '../../hooks/useAlarmList';

import SearchBar from '../../components/SearchBar/SearchBar';
import StatusFilter from '../../components/StatusFilter/StatusFilter';

const URL = process.env.REACT_APP_FAKE_SERVER_URL;

const AlarmFilters = () => {
  const [filterState, setFilterState] = useState({
    searchValue: '',
    alignment: null,
    url: '',
    activeFilter: false,
  });
  const [isLoading] = useAlarmList(filterState.url);

  const changeHandler = (evt, newAlignment) => {
    const { value } = evt.target;
    setFilterState({
      ...filterState,
      alignment: newAlignment,
      url: `filter?status=${value}`,
      activeFilter: true,
    });
  };
  const clearFilterHandler = () =>
    setFilterState({
      ...filterState,
      searchValue: '',
      alignment: null,
      url: `alarms`,
      activeFilter: false,
    });
  const searchBarHandler = (e) => {
    const { value } = e.target;
    setFilterState({
      ...filterState,
      searchValue: value,
    });
  };
  const searcButtonHandler = () =>
    setFilterState({
      ...filterState,
      url: `search?name=${filterState.searchValue}`,
      activeFilter: true,
    });

  return (
    <Box
      component='section'
      sx={{ mb: 1, alignItems: 'center' }}
    >
      <StatusFilter
        alignment={filterState.alignment}
        handleChange={changeHandler}
      />
      <SearchBar
        value={filterState.searchValue}
        handleChange={searchBarHandler}
        placeholder='Search By name...'
      />
      {!filterState.searchValue ? (
        <Button
          disabled
          onClick={() => searcButtonHandler()}
        >
          Search
        </Button>
      ) : (
        <Button onClick={() => searcButtonHandler()}>
          Search
        </Button>
      )}

      {filterState.activeFilter ? (
        <Button onClick={() => clearFilterHandler()}>
          X Clear Filter
        </Button>
      ) : null}
    </Box>
  );
};

export default AlarmFilters;
