import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Octicons } from "@expo/vector-icons";
import { ButtonWithTitle, Textfield } from "../components";
import { COLORS } from "../constants/constants";
import { getToken, getUserDetails } from "../redux/reducers/UserSlice";

const LoginScreen = ({ navigation }) => {
  const { token, user } = useSelector((state) => state.UserSlice);

  console.log(
    "emai",
    user?.email,
    "verified",
    user?.verified,
    "token",
    token,
    "user",
    user
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("Login");
  const [isSignUp, setIsSignUp] = useState(false);

  //verification hooks
  const [otp, setOtp] = useState("");
  const [verified, setVarified] = useState(true);
  const [requestsOtpTitle, setRequestOtpTitle] = useState(
    "Request a New OTP in"
  );
  const [canRequestOtp, setCanRequestOtp] = useState(false);

  const onUserLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://online-foods.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      dispatch(getToken(response?.data?.token));
      dispatch(getUserDetails(response?.data));
      if (response?.data?.token) {
        navigation.navigate("Cart");
      }
      setPassword("");
      setEmail("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onUserSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://online-foods.herokuapp.com/user/create-account",
        {
          email,
          phone,
          password,
        }
      );
      dispatch(getToken(response?.data?.token));
      dispatch(getUserDetails(response?.data));
      navigation.navigate("Cart");
      // console.log("response", response);
      setPhone("");
      setPassword("");
      setEmail("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const toggleUserSignInSignUp = () => {
    setIsSignUp(!isSignUp);
    setTitle(!isSignUp ? "Sign Up" : "Login");
  };

  let countDown;

  console.log();
  useEffect(() => {
    if (user?.verified !== undefined) {
      if (user?.verified === true) {
        navigation.navigate("Cart");
      } else {
        setVarified(user.verified);
        onEnableOtpRequest();
      }
    }
    //check for start timer
    return () => {
      clearInterval(countDown);
    };
  }, [user]);

  const onTapauthenticate = () => {
    if (isSignUp) {
      if (email === "" || phone === "" || password === "") {
        Alert.alert("Alert", "All fields are require", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        onUserSignUp();
      }
    } else {
      if (email === "" || password === "") {
        Alert.alert("Alert", "All fields are require", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        onUserLogin();
      }
    }
  };

  const onEnableOtpRequest = () => {
    const otpDate = new Date();
    otpDate.setTime(new Date().getTime() + 2 * 60 * 1000);
    const otpTime = otpDate.getTime();

    countDown = setInterval(() => {
      const currentTime = new Date().getTime();
      const totalTime = otpTime - currentTime;
      let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

      setRequestOtpTitle(`Requst a New OTP in ${minutes}: ${seconds}`);
      if (minutes < 1 && seconds < 1) {
        setRequestOtpTitle("Request a New OTP");
        setCanRequestOtp(true);
        clearInterval(countDown);
      }
    }, 1000);
  };

  const requestOTP = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.patch(
        `https://online-foods.herokuapp.com/user/verify`
      );
      console.log("response", response);
    } catch (err) {}
  };

  const onVerifyOTP = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.patch(
        `https://online-foods.herokuapp.com/user/verify`,
        {
          otp,
        }
      );
      console.log("response", response);
    } catch (err) {}
  };

  const onTapVerify = () => {
    onVerifyOTP();
  };

  const onTapReqeustNewOTP = () => {
    setCanRequestOtp(false);
    requestOTP();
  };

  // if (!token) {
  //   return (
  //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //       <View style={styles.container}>
  //         <View style={styles.body}>
  //           <Octicons name="verified" size={100} color="#1ac2ff" />
  //           <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
  //             Verification
  //           </Text>
  //           <Text
  //             style={{
  //               fontSize: 16,
  //               padding: 10,
  //               marginBottom: 20,
  //               color: "#716f6f",
  //             }}
  //           >
  //             Enter the OTP sent to your mobile number
  //           </Text>

  //           <Textfield
  //             inSecure={true}
  //             isOTP={true}
  //             type="numeric"
  //             placeholder="OTP"
  //             onTextChange={setOtp}
  //           />
  //           <ButtonWithTitle title="Verify OTP" onTap={onTapVerify} />
  //           <ButtonWithTitle
  //             title={requestsOtpTitle}
  //             isNoBg={true}
  //             onTap={onTapReqeustNewOTP}
  //             disabled={!canRequestOtp}
  //           />
  //         </View>
  //       </View>
  //     </TouchableWithoutFeedback>
  //   );
  // } else {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.navigation}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {!isSignUp ? "Login" : "Sign Up"}
          </Text>
        </View>
        <View style={styles.body}>
          <Textfield
            placeholder="Email"
            type="email-address"
            onTextChange={setEmail}
          />
          {isSignUp && (
            <Textfield
              placeholder="Phone"
              type="numeric"
              onTextChange={setPhone}
            />
          )}
          <Textfield
            placeholder="Password"
            inSecure={true}
            onTextChange={setPassword}
          />
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <ButtonWithTitle title={title} onTap={onTapauthenticate} />
          )}
          <ButtonWithTitle
            title={
              !isSignUp
                ? "No Account ? SignUp Here"
                : "Have an Account? Login Here"
            }
            onTap={toggleUserSignInSignUp}
            isNoBg={true}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
    paddingLeft: 50,
    paddingTop: 50,
  },
  body: {
    flex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 1,
  },
});
