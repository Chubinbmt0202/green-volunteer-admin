import Head from "next/head";
import { Box } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { DayAdd } from "../sections/day/day-add";
import axios from "axios";
import { instance } from "src/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";


// Define the API endpoint

const PageAddActivity = () => {
  const [formSections, setFormSections] = useState(1);
  const router = useRouter()
  const { id } = router.query;
  const addFormSection = () => {
    setFormSections((prevSections) => prevSections + 1);
  };

  const removeFormSection = () => {
    if (formSections > 1) {
      setFormSections((prevSections) => prevSections - 1);
    }
  };


  const [activityData, SetActivityData] = useState({
    id: id,
    title: "",
    body: "",
    timeStart: "",
    time_end: "",
    num_vol: "",
    address: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    SetActivityData({
      ...activityData,
      [e.target.name]: value,
    });
  };
  

  const handleUpdateActivity = async () => {
    try {
      const response = await instance.put(`/activities`, activityData);
      console.log(">>>>>");

      if (response.status === 200) {
        SetActivityData(response)
        toast.success("Cập nhật hoạt động thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.push("/activity");
      } else {
        console.error("Failed to update activity");
      }
    } catch (error) {
      console.error("Error updating activity:", error.message);
    }
  };
  return (
    <>
      <Head>
        <title>Activity | Update</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <form className="max-w-4xl ml-10">
          <div className="space-y-12">
            <div className="">
              <h2 className="text-xl font-bold leading-7 text-gray-900">Chỉnh sửa hoạt động</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="titleActivity"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tên hoạt động
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        id="titleActivity"
                        name="title"
                        value={activityData.title}
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 "
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mô tả đặc điểm nổi bật của hoạt động
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="body"
                      value={activityData.body}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Viết một vài thông tin nổi bật về chuyến đi.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="coverThumnalil"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumnail image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="coverThumnalil"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="coverThumnalil"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="timeStart"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ngày đi
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="timeStart"
                      value={activityData.timeStart}
                      onChange={handleChange}
                      id="timeStart"
                      autoComplete="given-name"
                      className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="timeEnd"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ngày về
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="time_end"
                      value={activityData.time_end}
                      onChange={handleChange}
                      id="timeEnd"
                      autoComplete="family-name"
                      className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="adress"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Điểm đến
                  </label>
                  <div className="mt-2">
                    <input
                      name="address"
                      value={activityData.address}
                      onChange={handleChange}
                      type="text"
                      id="adress"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="sumVol"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Số lượng tình nguyện viên tham gia
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="num_vol"
                      id="sumVol"
                      value={activityData.num_vol}
                      onChange={handleChange}
                      autoComplete="country-name"
                      className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" border-t border-gray-900/10 pt-10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Thông tin chi tiết về chuyến đi
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Hãy mô tả thêm về chuyến đi</p>

            {/* Chi tiết ngày */}
          </div>

          {/* Chi tiết ngày */}

          {[...Array(formSections)].map((_, index) => (
            <div key={index} className="max-w-4xl ml-10 mt-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Chi tiết ngày {index + 1}
              </h2>
              <div className="mt-2">
                <textarea
                  placeholder={`8h: Xuất phát tại Hà Nội – TP Hà Giang – Quản Bạ\n9h30: Tập trung di chuyển tại 142 Giảng Võ (Cửa hàng Kính mắt Việt Tín), Ba Đình, Hà Nội.\n20h00: Đoàn bắt đầu xuất phát.`}
                  id="aboutDay"
                  name="about"
                  rows={3}
                  className=" px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <button
                type="button"
                onClick={removeFormSection}
                className="mt-3 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Bỏ ngày
              </button>
              {/* ... (your existing form code) */}
            </div>
          ))}
          <div className="mt-6 flex items-center gap-x-6">
            <button
              type="button"
              onClick={addFormSection}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Thêm ngày
            </button>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Huỷ
            </button>
            <button
              type="button"
              onClick={handleUpdateActivity}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cập nhật hoạt động
            </button>
          </div>
        </form>
      </Box>
    </>
  );
};

PageAddActivity.getLayout = (PageAddActivity) => (
  <DashboardLayout>{PageAddActivity}</DashboardLayout>
);

export default PageAddActivity;
