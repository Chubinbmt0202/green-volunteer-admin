import PropTypes from "prop-types";
import { format } from "date-fns";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Spin } from "antd";
import { useRouter, withRouter } from "next/router";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { instance } from "src/api";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { textState } from "src/constants/constants";

export const ActivitiesTable = (props) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const [selectedId, setSelectedId] = useState("");
  const [text, setText] = useRecoilState(textState);
  const router = useRouter()

  const handleDelete = async () => {
    try {
      if (selectedId) {
        setOpen(false);
        const response = await instance.delete(`/activities/${selectedId}`);

        if (response.status === 200) {
          setText((oldText) => ({
            ...oldText,
            changeState: true,
          }));
          toast.success("Xoá hoạt động thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleUpdate = (id) => {
    router.push(`/updateActivity?id=${id}` );
  };
  

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          {/* <Spin size="large" className="flex justify-center items-center   " /> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Tiều đề</TableCell>
                <TableCell>Thời gian đi</TableCell>
                <TableCell>Thời gian về</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((activity) => {
                const isSelected = selected.includes(activity.id);
                // const createdAt = format(customer.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow hover 
                  key={activity.id} 
                  selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(activity.id);
                          } else {
                            onDeselectOne?.(activity.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" 
                      direction="row" 
                      spacing={2}>
                        <Typography variant="subtitle2">{activity.title}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{activity.timeStart}</TableCell>
                    <TableCell>{activity.time_end}</TableCell>
                    <TableCell>{activity.num_vol}</TableCell>
                    <TableCell>{activity.address}</TableCell>
                    {/* <TableCell>{createdAt}</TableCell> */}
                    <TableCell>{"Đang"}</TableCell>
                    <TableCell>
                      {
                        <div className="flex">
                          <button
                            onClick={() => {
                              setOpen(true);
                              setSelectedId(activity.id);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Xoá
                          </button>

                          <button onClick={() => {setSelectedId(activity.id), handleUpdate(activity.id)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Sửa
                          </button>
                        </div>
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
              {open && (
                <Transition.Root show={open} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                  <ExclamationTriangleIcon
                                    className="h-6 w-6 text-red-600"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                  <Dialog.Title
                                    as="h3"
                                    className="text-base font-semibold leading-6 text-gray-900"
                                  >
                                    Deactivate account
                                  </Dialog.Title>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      Are you sure you want to deactivate your account? All of your
                                      data will be permanently removed. This action cannot be
                                      undone.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                onClick={handleDelete}
                              >
                                Deactivate
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => {
                                  setOpen(false);
                                  setSelectedId("");
                                }}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>

                              {/* Same as */}
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition.Root>
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ActivitiesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
