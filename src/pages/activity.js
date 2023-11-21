import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ActivitiesTable } from "src/sections/activity/activities-table";
import { ActivitiesSearch } from "src/sections/activity/activities-search";
import { applyPagination } from "src/utils/apply-pagination";
import axios from "axios";
import { instance } from "src/api";
import { textState } from "src/constants/constants";
import { useRecoilState } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";
import { is } from "date-fns/locale";
import {overlayStyles, spinnerStyles, isSpiner} from '../styles/spinerStyle'

const now = new Date();

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [text, setText] = useRecoilState(textState);
  const [isSpiner, setIsSpiner] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsSpiner(true);

        const response = await instance.get(
          `/activities?page=${"1"}&pageSize=${"50"}&status=${""}`
        );
        console.log(response.data)
        setData(response.data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsSpiner(false);
      }
    };

    fetchData();
  }, [text]);

  const useActivities = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(data, page, rowsPerPage);
    }, [page, rowsPerPage, data]);
  };

  const useActivitiyId = (activities) => {
    return useMemo(() => {
      return activities.map((customer) => customer.id);
    }, [activities]);
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const activities = useActivities(page, rowsPerPage);
  const activitiyId = useActivitiyId(activities);
  const activitiesSelection = useSelection(activitiyId);

  return (
    <>
      <Head>
        <title>Hoạt động | Green Volunteer</title>
      </Head>
      <div style={overlayStyles}></div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        {isSpiner && <CircularProgress style={spinnerStyles} />}
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Các hoạt động</Typography>
              </Stack>
            </Stack>
            <ActivitiesSearch />
            <ActivitiesTable
              count={data.length}
              items={activities}
              onDeselectAll={activitiesSelection.handleDeselectAll}
              onDeselectOne={activitiesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={activitiesSelection.handleSelectAll}
              onSelectOne={activitiesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={activitiesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
