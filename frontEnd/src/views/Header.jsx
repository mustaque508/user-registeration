// inlcude all import files

import 'bootstrap/dist/css/bootstrap.min.css'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import TextField from '@material-ui/core/TextField'
import { Checkbox,FormControlLabel} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link,BrowserRouter } from 'react-router-dom'
import React ,{ useState,useEffect } from 'react'
import { Route, Switch } from 'react-router'
import HomePage from '../views/HomePage'
import Router from '../config/Router'
import login_img from '../dist/img/Login.svg'
import { useLocation,useHistory} from 'react-router'
import CommonImage from './CommonImage'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import {util} from 'intl-tel-input/build/js/utils'
import '../views/RegisterForm'
import InfoSharpIcon from '@material-ui/icons/InfoSharp'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ReactDOM from 'react-dom'
import '../dist/css/index.css'
import App from '../views/App'
import { plugin_for_contact} from '../dist/plugins/Countrycode'
import Tooltip from '@material-ui/core/Tooltip'
import {makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import validator from 'validator'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Welcome from './Welcome'
import Forgotpassword from './Forgotpassword'
import Activate from './Activate'
import Reactivate from './Reactivate'
import Resetpassword from './Resetpassword'
import Cookies from 'js-cookie';
import atob from 'atob';

toast.configure()

// color theme for button [login and submit button]
const colortheme = createMuiTheme({
    palette: {
      primary: { main: "#0275d8", contrastText: "#fff" }
    }
  });

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
    OverlayTrigger,ReactDOM,BrowserRouter,App,Tooltip,BootstrapTooltip,plugin_for_contact,util,axios,validator,toast,Welcome,useHistory,
  Forgotpassword,Activate,Reactivate,Resetpassword,Cookies,atob};