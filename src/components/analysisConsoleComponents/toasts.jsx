import React from "react";
import { toast } from "react-toastify";

export const ToastSubjectIdLocked = (fullSubjectId) => {
  return toast.info(
    toastBootstrap("Subject ID is looked: \n" + fullSubjectId)
  );
}

export const ToastSubjectIdInvalid = () => {
  return toast.error(
    toastBootstrap("Invalid Subject ID!")
  );
};

export const ToastStart = {
  loading: function () {
    return toast.loading("Starting ...", toastConfig);
  },
  success: function (id) {
    return toast.update(id, {
      render: toastBootstrap("Sampling started"),
      type: "success",
      isLoading: false,
      ...toastConfig,
    });
  },
  error: function (id) {
    return toast.update(id, {
      render: toastBootstrap("Fail to start"),
      type: "error",
      isLoading: false,
      ...toastConfig,
    });
  },
};

export const ToastStop = {
  loading: function () {
    return toast.loading("Stopping ...");
  },
  success: function (id) {
    return toast.update(id, {
      render: toastBootstrap("Sampling stopped"),
      type: "info",
      isLoading: false,
      ...toastConfig,
    });
  },
  error: function (id) {
    return toast.update(id, {
      render: toastBootstrap("Fail to stop"),
      type: "error",
      isLoading: false,
      ...toastConfig,
    });
  },
};

export const ToastDataSent = {
  loading: function () {
    return toast.loading("Data's sending");
  },
  success: function (id) {
    return toast.update(id, {
      render: toastBootstrap("Data Sent"),
      type: "success",
      isLoading: false,
      ...toastConfig,
    });
  },
  error: function (id) {
    return toast.update(id, {
      render: toastBootstrap("Fail to send"),
      type: "error",
      isLoading: false,
      ...toastConfig,
    });
  },
};

const toastConfig = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const toastBootstrap = (mess) => {
  return (
    <div class="d-flex justify-content-between">
      <span class="fw-bold">{mess}</span>
      <span>
        <small class="fw-lighter text-muted">
          {new Date().toLocaleTimeString()}
        </small>
      </span>
    </div>
  );
};
