import {
	Avatar,
	Typography,
	Button,
	Toolbar,
	Paper,
	Grid,
	Container,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useStyles from "./styles.js";
import { useState } from "react";
import Input from "./Input";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const { classes } = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const switchMode = () => {
		setIsSignUp(!isSignup);
		setShowPassword(false);
	};
	const googleSuccess = async (res) => {
		const decoded = jwt_decode(res.credential);
		const result = decoded;
		const token = res.credential;
		try {
			dispatch({ type: "AUTH", data: { result, token } });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (error) => {
		console.log(error);
		console.log("Google sign in failed");
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{isSignup ? "Sign up" : "Sign in"}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autofocus
									half
								/>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email Address"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>
					<GoogleLogin
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						// <Button className={classes.google} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
						//     Google Sign In
						// </Button>

						// onSuccess={googleSuccess}
						// onFailure={googleFailure}
						// cookiePolicy="single_host_origin"
					/>
					<Grid container justifyContent="flex-end">
						<Grid>
							<Button onClick={switchMode}>
								{isSignup
									? "Already have an account? Sign In"
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
