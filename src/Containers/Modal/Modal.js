import React from 'react';
import Modal from 'react-modal';
import './Modal.css';
import {deleteicon} from '../../Utils/images';
import timeicon from '../../Assets/timeicon.png';
export const ConfirmModal = props => {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        className="Confirm_Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: '#7B7B7B',
          },
        }}
        shouldCloseOnOverlayClick={true}
        contentLabel="Confirm Modal"
      >
        <div className="Modal_container">
          <div>
            <button
              className="Confirm_modal_close_button"
              onClick={props.modalClose}
            >
              <img alt="close_icon" src={deleteicon} className="close_icon" />
            </button>
          </div>
          <p className="reschdule_text">
            Reschedule Appointment
          </p>
          <p className="Your_appointment_reschedule">
          If you click on reschedule button your previous appointment 
            will be cancelled automatically.
          </p>
          <div className="Confirm_divider" />
          <p className="Confirmed_confirm">
            {props && props.data && props.data.meetingtitle
              ? props.data.meetingtitle
              : 'N/A'}
          </p>
          <p className="modal_Meeting_time">
            {props && props.time ? props.time : ''}
            ,
            {' '}
            {props && props.date ? props.date : ''}
          </p>
          <p className="modal_Meeting_duration">
            <img alt="timeicon" src={timeicon} style={{}} />
            <span>
              {' '}
              {props && props.data && props.data.meetingduration
                ? props.data.meetingduration
                : 'N/A'}
            </span>
          </p>
          <div className="Cancel_button_div">
          <button className="Modal_RescheduleApp_buton" onClick={props.rescheduleApp}>
            {' '}
            Reschedule {' '}
          </button>
        </div>
        </div>
      </Modal>
    </div>
  );
};

export const CancelModal = props => {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        className="Cancel_Modal"
        style={{
          overlay: {
            backgroundColor: '#7B7B7B',
          },
        }}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        contentLabel="Cancel Modal"
      >
        <div className="Modal_container">
          <div>
            <button
              className="Cancel_modal_close_button"
              onClick={props.modalClose}
            >
              <img alt="close_icon" src={deleteicon} className="close_icon" />
            </button>
          </div>
          <p className="Cancellation">
            Cancellation
          </p>
          <p className="Your_appointment_modal">
            Your appointment is scheduled for ...
          </p>
          <div className="Confirm_divider" />
          <p className="Confirmed_cancel">
            {props && props.data && props.data.meetingtitle
              ? props.data.meetingtitle
              : 'N/A'}
          </p>
          <p className="modal_Meeting_time">
            {props && props.time ? props.time : ''}
            ,
            {' '}
            {props && props.date ? props.date : ''}
          </p>
          <p className="modal_Meeting_duration">
          <img alt="timeicon" src={timeicon} className="cancel_modalimg" />
            {props && props.data && props.data.meetingduration
              ? props.data.meetingduration
              : 'N/A'}
          </p>
          <div className="Cancel_button_div">
            <button className="Modal_CancelApp_buton" onClick={props.cancelApp}>
              {' '}
              Cancel Appointment{' '}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
