import PropTypes from "prop-types";
import { format } from "date-fns";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter, withRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
import { instance } from "src/api";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { textState } from "src/constants/constants";


export const ActivitiesTable = (props) => {
  const [openPopDel, setOpenPopDel] = useState(false);
  const [openPopUpDate, setOpenPopUpdate] = useState(false);
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
  const router = useRouter();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleDelete = async () => {
    try {
      if (selectedId) {
        setOpenPopDel(false);
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
    router.push(`/updateActivity?id=${id}`);
  };

  const handleDetail = (id) => {
    router.push(`/detailActivity?id=${id}`);
  };
  
  

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
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
                <TableCell>Hoạt động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((activity) => {
                const isSelected = selected.includes(activity.id);
                return (
                  <TableRow hover key={activity.id} selected={isSelected}>
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
                      <a className=" cursor-pointer text-cyan-700" onClick={() => handleDetail(activity.id)}>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Typography variant="subtitle2">{activity.title}</Typography>
                          </Stack>
                      </a>
                    </TableCell>
                    <TableCell>{format(new Date(activity.timeStart), 'yyyy-MM-dd')}</TableCell>
                    <TableCell>{format(new Date(activity.time_end), 'yyyy-MM-dd')}</TableCell>
                    <TableCell>{activity.num_vol}</TableCell>
                    <TableCell>{activity.address}</TableCell>
                    <TableCell>{"Đang"}</TableCell>
                    <TableCell>
                      {
                        <Menu as="div" className="relative inline-block text-left">
                          <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900  ring-gray-300 hover:bg-gray-50">
                              Options
                              <ChevronDownIcon
                                className="-mr-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            className="z-20"
                          >
                            <Menu.Items className="absolute z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      onClick={() => {
                                        setOpenPopDel(true);
                                        setSelectedId(activity.id);
                                      }}
                                      className={classNames(
                                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Xoá
                                    </a>
                                  )}
                                </Menu.Item>
                                <form method="POST" action="#">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        onClick={() => {
                                          setSelectedId(activity.id), handleUpdate(activity.id);
                                        }}
                                        className={classNames(
                                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                          "block w-full px-4 py-2 text-left text-sm"
                                        )}
                                      >
                                        Sửa
                                      </a>
                                    )}
                                  </Menu.Item>
                                </form>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
              {openPopDel && (
                <Transition.Root show={openPopDel} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpenPopDel}
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
                                    Xoá hoạt động
                                  </Dialog.Title>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      Bạn có chắc chắn muốn hủy kích hoạt tài khoản của mình không?
                                      Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn. Hành động này
                                      không thể được hoàn tác.
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
                                  setOpenPopDel(false);
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
