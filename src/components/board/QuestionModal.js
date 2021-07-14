import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import QuestionCard from './QuestionCard';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '75%',
    paddingLeft: '25%',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function QuestionModal({ submitAnswer, questionData, questionModalOpen, setQuestionModalOpen, answerData }) {
  const classes = useStyles();

  const handleOpen = () => {
    setQuestionModalOpen(true);
  };

  const handleClose = () => {
    setQuestionModalOpen(false);
  };


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={questionModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableBackdropClick
      >
        <Fade in={questionModalOpen}>
          <QuestionCard submitAnswer = {submitAnswer} question = {questionData} setQuestionModalOpen={setQuestionModalOpen} answerData = {answerData} />
        </Fade>
      </Modal>
    </div>
  );
}

