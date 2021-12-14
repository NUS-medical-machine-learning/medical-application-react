import React, { Component } from "react";

// class ActivityReport extends React.Component {
//     render() { 
//         return (
//           <div>
//             <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
//               <symbol
//                 id="check-circle-fill"
//                 fill="currentColor"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
//               </symbol>
//               <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
//                 <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
//               </symbol>
//               <symbol
//                 id="exclamation-triangle-fill"
//                 fill="currentColor"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
//               </symbol>
//               <symbol id="play-fill" fill="currentColor" viewBox="0 0 16 16">
//                 <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
//               </symbol>

//               <symbol id="stop-fill" fill="currentColor" viewBox="0 0 16 16">
//                 <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
//               </symbol>

//               <symbol id="send-fill" fill="currentColor" viewBox="0 0 16 16">
//                 <path
//                   fill-rule="evenodd"
//                   d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"
//                 />
//               </symbol>
//             </svg>
//             <div className={this.props.event.alertType} role="alert">
//               <div class="col-1 me-2">
//                 <svg
//                   className="bi flex-shrink-0"
//                   width={24}
//                   height={24}
//                   role="img"
//                   aria-label="Success:"
//                 >
//                   <use xlinkHref={this.props.event.icon} />
//                 </svg>
//               </div>
//               <div class="col-10 align-self-end">
//                 <div class="row">
//                   <span class="">
//                     <span className="fw-bold fs-6 me-1">
//                       {this.props.subjectID}:
//                     </span>{" "}
//                   </span>
//                   <span class="d-flex justify-content-start mt-1">
//                     {this.props.event.message}
//                   </span>
//                 </div>

//                 <div class="d-flex justify-content-end">
//                   <p className="fw-lighter fs-6 mb-0 ms-auto">
//                     {new Date().toLocaleTimeString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//     }
// }
 

function ActivityReport({ subjectID, event }) {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
        <symbol id="play-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </symbol>

        <symbol id="stop-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
        </symbol>

        <symbol id="send-fill" fill="currentColor" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"
          />
        </symbol>
      </svg>
      <div className={event.alertType} role="alert">
        <div class="col-1 me-2">
          <svg
            className="bi flex-shrink-0"
            width={24}
            height={24}
            role="img"
            aria-label="Success:"
          >
            <use xlinkHref={event.icon} />
          </svg>
        </div>
        <div class="col-10 align-self-end">
          <div class="row">
            <span class="">
              <span className="fw-bold fs-6 me-1">{subjectID}:</span>{" "}
            </span>
            <span class="d-flex justify-content-start mt-1">
              {event.message}
            </span>
          </div>

          <div class="d-flex justify-content-end">
            <p className="fw-lighter fs-6 mb-0 ms-auto">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityReport;

export class Status {
  // Create new instances of the same class as static attributes
  static Started = new Status(
    <span>Sampling started</span>,
    "#play-fill",
    "alert-light"
  );
  static Stopped = new Status(
    <span>Sampling stopped</span>,
    "#stop-fill",
    "alert-light"
  );
  static Sending = new Status(
    <span>Data Sending</span>,
    "#send-fill",
    "alert-warning"
  );
  static Negative = new Status(
    (
      <span>
        Result is <span class="badge bg-success">NEGATIVE</span>
      </span>
    ),
    "#check-circle-fill",
    "alert-success"
  );
  static Positive = new Status(
    (
      <span>
        Result is <span class="badge bg-danger">POSITIVE</span>
      </span>
    ),
    "#exclamation-triangle-fill",
    "alert-danger"
  );

  constructor(message, icon, alert) {
    this.mess = message;
    this.icon = icon;
    this.alert = alert;
  }

  get alertType() {
    return "row align-items-center alert " + this.alert + " border px-0";
  }

  get message() {
    return this.mess;
  }
}
