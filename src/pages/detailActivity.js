import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { instance } from "src/api";
import CircularProgress from "@mui/material/CircularProgress";
import { overlayStyles, spinnerStyles, isSpiner } from "../styles/spinerStyle";
import { useRouter } from "next/router";
import { format } from "date-fns";
// ...

const Page = () => {
  const [dataActivity, setDataActivity] = useState();
  const [isSpiner, setIsSpiner] = useState(false);
  const [image, setImage] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsSpiner(true);

        const response = await instance.get(`/activities/getId/${id}`);
        setDataActivity(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsSpiner(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Hoạt động | Green Volunteer</title>
      </Head>
      <div style={overlayStyles}></div>
      <Box>
        {isSpiner && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {dataActivity && (
          <Container>
            <div>
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-bold leading-7 text-gray-900">Chi tiết hoạt động</h3>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Tiêu đề</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {dataActivity.data.title}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Địa điểm</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {dataActivity.data.address}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Số lượng tình nguyện viên
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {dataActivity.data.num_vol}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Trạng thái</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {dataActivity.data.status}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Thời gian đi</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {format(new Date(dataActivity.data.timeStart), "yyyy-MM-dd")}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Thời gian về</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {format(new Date(dataActivity.data.time_end), "yyyy-MM-dd")}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nội dung</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {dataActivity.data.body}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Chi tiết hoạt động
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {dataActivity.data.details}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Hình ảnh</dt>
                    <div style={{ display: "flex" }}>
                      {dataActivity.data.images.map((image) => (
                        <img
                          key={image.id}
                          src={image.image_url}
                          alt={`Image ${image.id}`}
                          style={{ maxWidth: "100px", marginRight: "10px" }}
                        />
                      ))}
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </Container>
        )}
      </Box>
    </>
  );
};

// ...

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
