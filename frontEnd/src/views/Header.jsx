// inlcude all import files

import 'bootstrap/dist/css/bootstrap.min.css'
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField'
import { Checkbox,FormControlLabel} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link,BrowserRouter,Redirect } from 'react-router-dom'
import React ,{ useState,useEffect,useContext,createContext,forwardRef,useRef } from 'react'
import { Route, Switch } from 'react-router'
import HomePage from '../views/HomePage'
import Router from '../config/Router'
import login_img from '../dist/img/Login.svg'
import { useLocation,useHistory} from 'react-router'
import CommonImage from './CommonImage'
import LoginForm from './Login/LoginForm'
import RegisterForm from './Register/RegisterForm'
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import {util} from 'intl-tel-input/build/js/utils'
import InfoSharpIcon from '@material-ui/icons/InfoSharp'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ReactDOM from 'react-dom'
import App from '../views/App'
import { plugin_for_contact} from '../dist/plugins/Countrycode'
import Tooltip from '@material-ui/core/Tooltip'
import {makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import validator from 'validator'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Forgotpassword from './Forgot/Forgotpassword'
import Activate from './Register/Activate'
import Resetpassword from './Forgot/Resetpassword'
import Cookies from 'js-cookie'
import atob from 'atob'
import PageNotFound from './PageNotFound'
import Sidebar from './Complaints/SideBar'
import avatar from '../dist/img/avatar.png'
import '../dist/css/sidebar.css'
import NewComplaint from './Complaints/NewComplaint'
import Welcome from './Complaints/Welcome'
import SideBar from './Complaints/SideBar'
import WelcomeBar from './Complaints/WelcomeBar'
import ComplaintView from './Complaints/ComplaintView'
import '../dist/css/complaint.css'
import Comaplaints from './Complaints/Complaints'
import Videos from './youtubeVideos/Videos'
import playlist_data from './youtubeVideos/playlist'
import ForumIcon from '@material-ui/icons/Forum';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import 'animate.css/animate.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import $ from 'jquery'
import '../dist/css/youtube.css'
import Slider from '@material-ui/core/Slider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Typography } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PauseIcon from '@material-ui/icons/Pause';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'
import PlayerControls from './youtubeVideos/PlayerControls'
import screenfull from 'screenfull'
import getYouTubeID from 'get-youtube-id';


toast.configure()

// color theme for button [login and submit button]
const colortheme = createMuiTheme({
    palette: {
      primary: { main: "#0275d8", contrastText: "#fff" }
    }
  });


  //bootstrap 
  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color:"red"
    },
    tooltip: {
      backgroundColor:"red",
      fontSize: "0.8rem"
    },
  }));


  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} disableFocusListener disableHoverListener disableTouchListener />;
  }

  export {colortheme,MuiThemeProvider,TextField,Checkbox,FormControlLabel,Button,Link,React,Route,Switch,HomePage,Router,
    login_img,useLocation,CommonImage,LoginForm,RegisterForm,useState,useEffect,intlTelInput,InfoSharpIcon,Popover,
    OverlayTrigger,ReactDOM,BrowserRouter,App,Tooltip,BootstrapTooltip,plugin_for_contact,util,axios,validator,toast,useHistory,
  Forgotpassword,Activate,Resetpassword,Cookies,atob,Redirect,PageNotFound,Sidebar,avatar,useContext,
  createContext,NewComplaint,Welcome,SideBar,WelcomeBar,ComplaintView,Comaplaints,Videos,playlist_data
  ,ForumIcon,VideoLibraryIcon,ExitToAppOutlinedIcon,$,PlayArrowIcon,SkipNextIcon,SkipPreviousIcon,FastForwardIcon,FastRewindIcon,
  VolumeUpIcon,Typography,FullscreenIcon,PauseIcon,PauseCircleFilledIcon,VolumeOffIcon,PropTypes,forwardRef,ReactPlayer,PlayerControls
,screenfull,Slider,useRef,getYouTubeID};