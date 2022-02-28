import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core';
import { InputBase, Box, IconButton, Avatar, Typography, Paper } from "@material-ui/core"
import { Header } from '../../components';
import { Search,Wc, Mail, Cake } from "@material-ui/icons";
import { img_background } from "../../assets/images"
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { useHistory } from "react-router-dom";
import { getDetailCheckin, getDetailStudent } from '../../store/slices/checkinSlice';
import { get } from 'lodash';

export default function FindDetal() {
    const classes = useStyles();
    const [keyWord, setKeyWord] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const selectorDetail = useSelector((state) =>
        get(state, "checkinStore.detailCheckin", {})
    );

    const detail = get(selectorDetail, "current", [])

    const selectorStudent = useSelector((state) =>
        get(state, "checkinStore.detailStudent", {})
    );

    const student = get(selectorStudent, "current", {})

    const submitSearch = (keyWord) => {
        console.log("keyWord", keyWord)
        dispatch(getDetailCheckin(keyWord));
        dispatch(getDetailStudent(keyWord))
        setShow(true);
    }

    return (
        <div className={classes.root}>
            <Header></Header>
            <div className={classes.imgContent}>
                <Box className={classes.content}>
                    < div className={classes.search}>
                        <InputBase
                            value={keyWord}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                            onChange={(event) => {
                                setKeyWord(event.target.value);
                            }}
                        />
                        <IconButton className={classes.searchIcon} onClick={() => submitSearch(keyWord)}>
                            <Search />
                        </IconButton>
                    </div>
                    {show && (
                        <Paper
                            elevation={3}
                            className={classes.paper}>
                            <div className={classes.person}>
                                <div>
                                    <Avatar
                                        className={classes.avtStyle}
                                        src={student?.image}
                                        alt="Avatar"></Avatar>
                                </div>
                                <div className={classes.personcontent}>
                                    <div style={{ margin: "12px auto" }}>
                                        <Typography style={{
                                            fontSize: "24px", fontFamily: "Nunito",
                                            color: "#533e6b"
                                        }}>{student?.first_name + " " + student?.last_name}</Typography>
                                    </div>
                                    <div className={classes.content}>
                                        
                                        <Typography className={classes.typoItem}>Email: {student.email ? student.email : "None"}</Typography>
                                        <Typography className={classes.typoItem}>Gender: <span>{student.sex ? student.sex === 1 ? "Male" : "Female" : "None"}</span></Typography>
                                        <Typography className={classes.typoItem}>Birthday: <span>{student.birthday ? student.birthday : "None"}</span></Typography>
                                    </div>
                                    <div className={classes.timeline}>
                                        <Timeline style={{ margin: 0 }}>
                                            {detail.map((item, index) => (
                                                <TimelineItem className={classes.timelineItem}>
                                                    <TimelineOppositeContent className={classes.timelineOpp}>
                                                        <Typography color="textSecondary">{item.date}</Typography>
                                                        <Typography color="textSecondary">{item.time}</Typography>
                                                    </TimelineOppositeContent>
                                                    <TimelineSeparator>
                                                        <TimelineDot />
                                                        {index + 1 !== detail.length && <TimelineConnector />}
                                                    </TimelineSeparator>
                                                    <TimelineContent><Paper elevation={3} className={classes.card}>
                                                        <Avatar
                                                            alt="Avatar"
                                                            src={`https://nckh-2022.s3.amazonaws.com/${item?.image}`}
                                                        ></Avatar>
                                                        <Typography style={{ color: "#ea3c3c", fontFamily: "Nunito", fontSize: "16px" }}>Mask: <span style={{ color: "#533e6b" }}>{item.mask ? "Yes" : "No"}</span></Typography>
                                                    </Paper></TimelineContent>
                                                </TimelineItem>
                                            ))}
                                        </Timeline>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    )}
                </Box>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${img_background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        position: "relative"

    },
    imgContent: {
        display: "flex",
        width: "100%",
        justifyContent: "center"

    },
    content: {
        margin: "auto",
        width: 600,
    },
    contentsecond: {
        display: "flex",    
        justifyContent: "center"
    },
    person: {
        marginTop: "2rem",
        height: "60vh",
        overflowY: "auto",
        overflowX: "hidden"
    },
    search: {
        position: "relative",
        backgroundColor: "white",
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            //marginLeft: theme.spacing(3),
            width: "100%",
        },
        display: "flex",
        borderRadius: 4,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.23)"
    },
    searchIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
    },
    card: {
        padding: '6px 16px',
    },
    avtStyle: {
        margin: "auto",
        width: "6rem",
        height: "6rem",
        zIndex: 0,
    },
    timeline: {
        maxHeight: 400,
        padding: "12px 24px",
    },
    typoItem: {
        margin: "6px 6px",
        fontFamily: "Nunito",
        color: "#533e6b"
    },
    personcontent: {
    display: "flex",
    flexDirection:"column",
    justifyContent: "center"
  },
    timelineItem: {
        '&.MuiTimelineItem-missingOppositeContent:before': {
            flexGrow: 4
        }
    },
    timelineOpp: {
        flex: "none",
    },
    paper: {
        marginTop:"2rem",
        padding: "6px"
      },
}));