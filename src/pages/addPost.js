import Head from "next/head";
import { Box } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { DayAdd } from "../sections/day/day-add";
import axios from "axios";
import { instance } from "src/api";
import { textState } from "src/constants/constants";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { useRouter, withRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

// Define the API endpoint

const PageAddPost = () => {
  const [text, setText] = useRecoilState(textState);
  const router = useRouter();
  const [isSpiner, setIsSpiner] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [detailsImage, setDetailsImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event, type) => {
    const files = event.target.files;
  
    if (type === "thumbnail" && files.length > 0) {
      setThumbnailImage(files[0]);
      const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedFiles(fileArray);
    } else if (type === "details") {
      setDetailsImage(files[0]);
    } else {
      const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setSelectedFiles(fileArray);
    }
  };
  

  let user_id = localStorage.getItem("user_id");

  const [data, setData] = useState({
    title: "",
    body: "",
    user_id: user_id,
    address: "",
    status: "Active",
    created_at: "2023-11-28T12:00:00Z",
    updated_at: "2023-11-28T12:00:00Z",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleAddPost = async () => {
    const postData = {
      title: data.title,
      body: data.body,
      user_id: data.user_id,
      address: data.address,
      status: data.status,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    let formData = new FormData();
    formData.append("thumbnail_image", thumbnailImage);
    formData.append("details_image", detailsImage);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images[]", selectedFiles[i]);
    }

    Object.keys(postData).forEach((key) => {
      formData.append(key, postData[key]);
    });

    try {
      await instance.post("/posts", formData);

      setText({ changeState: true });
      setIsSpiner(true);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  useEffect(() => {
    if (text.changeState) {
      toast.success("Successfully added activity!");
      setIsSpiner(false);
      setText({ changeState: false });
      router.push("/post");
    }
  }, [text]);


  return (
    <>
      <Head>
        <title>Post | Create</title>
      </Head>
      {isSpiner && <CircularProgress style={spinnerStyles} />}
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
              <h2 className="text-xl font-bold leading-7 text-gray-900">Thêm bài viết</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="titleActivity"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tên bài viết
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        id="titlePost"
                        name="title"
                        value={data.title}
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
                    Mô tả nội dung bài viết
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="body"
                      name="body"
                      value={data.body}
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
                            onChange={(e) => handleFileChange(e, "thumbnail")}
                            
                          />
                          {selectedFiles.map((file, index) => (
                            <img
                              className=" inline-block"
                              key={index}
                              src={file}
                              alt={`Selected ${index + 1}`}
                              style={{ maxWidth: "100%", maxHeight: "200px", margin: "4px" }}
                            />
                          ))}
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="coverDetails"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Details image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="coverDetails"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="coverDetails"
                            name="file-upload-details"
                            type="file"
                            className="sr-only"
                            onChange={(e) => handleFileChange(e, "details")}
                          />
                          {detailsImage && (
                            <img
                              className=" inline-block"
                              src={URL.createObjectURL(detailsImage)}
                              alt={`Details Image`}
                              style={{ maxWidth: "100%", maxHeight: "200px", margin: "4px" }}
                            />
                          )}
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Huỷ
            </button>
            <button
              type="button"
              onClick={handleAddPost}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Thêm bài viết
            </button>
          </div>
        </form>
      </Box>
    </>
  );
};

PageAddPost.getLayout = (PageAddPost) => <DashboardLayout>{PageAddPost}</DashboardLayout>;

export default PageAddPost;
