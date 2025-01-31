"use client";
import {
  FunctionComponent,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
} from "react";
import Image from "next/image";
import hideIcon from "@/public/icons/hide.png";
import visibleIcon from "@/public/icons/visible.png";
import WithLabelInputField from "@/components/input-field/withLabel-input";
import CustomButton from "@/components/buttons";
import Logo from "@/public/images/cms_logo.png";
import "./style.css";
import { useRouter } from "next/navigation";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ScaleLoader } from "react-spinners";
const LoginContainer: FunctionComponent = () => {
  const { loginApi, handleOtp, otp, verifyOtp } = useContext(
    AdminContext
  ) as AdminContextType;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    otp?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [time, setTime] = useState(60);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setTime(60);

    let hasError = false;
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters";
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);

      // Simulate a login check
      const auth_data = {
        email,
        password,
      };

      const isValidLogin = await loginApi(auth_data);

      if (isValidLogin) {
        setLoading(false);

        setIsVerified(true);
      } else {
        // Set errors based on which field is incorrect
        newErrors.email =
          email !== "admin@gmail.com" ? "Invalid email or password" : undefined;
        newErrors.password =
          password !== "test1234" ? "Invalid email or password" : undefined;
        setLoading(false);

        setErrors(newErrors);
      }
    } else {
      setLoading(false);

      setErrors(newErrors);
      setIsVerified(false);
    }
  };

  const handleOtpVerification = async (event: FormEvent) => {
    event.preventDefault();

    if (!otp) {
      setErrors({
        otp: "Please Enter otp",
      });
    }
    const result = await verifyOtp();
    if (result) {
      router.push("/dashboard");
    }
  };

  //Start timer after the Otp Conditions met
  useEffect(() => {
    if (isVerified && time > 0) {
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // Stop the timer at 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isVerified, time]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <section className="login-main-container">
      <div className="area">
        {
          <>
            {isVerified === false ? (
              <div className="login-center-container">
                <div className="image-logo-container">
                  <Image
                    src={Logo}
                    alt="Logo"
                    width={100}
                    className="image-logo"
                  />
                </div>
                <h2 className="login-text">Log in</h2>
                <form onSubmit={handleSubmit} className="login-form">
                  <WithLabelInputField
                    name="email"
                    label="Email Id"
                    placeholder="Enter Email Id"
                    value={email}
                    onChange={handleEmailChange}
                    error={errors.email}
                  />
                  <div className="password-container">
                    <WithLabelInputField
                      name="password"
                      label="Password"
                      placeholder="Enter Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      error={errors.password}
                      view_only={false}
                      className="login-input-fields"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Image
                        src={showPassword ? visibleIcon : hideIcon}
                        alt={showPassword ? "Show" : "Hide"}
                      />
                    </button>
                  </div>
                  <div className="login-btn">
                    {loading === true ? (
                      <div className="loader">
                        <ScaleLoader
                          color="#093132"
                          loading={loading}
                          aria-label="Loading Spinner"
                        />
                      </div>
                    ) : (
                      <CustomButton
                        text={"Login"}
                        width={"-webkit-fill-available"}
                        onClick={() => {}}
                      />
                    )}
                  </div>
                </form>
              </div>
            ) : (
              // Otp Section
              <div className="otp-center-container">
                <div className="otp-title-text">
                  <h2 className="back-btn">
                    <IoMdArrowRoundBack
                      onClick={() => {
                        setIsVerified(false);
                      }}
                    />
                  </h2>
                  <h2 className="otp-text">Enter Otp</h2>
                </div>
                <form onSubmit={handleOtpVerification} className="otp-form">
                  <div className="otp-container">
                    <WithLabelInputField
                      name="otp"
                      label="OTP"
                      placeholder="Enter OTP"
                      value={otp}
                      type={showOtp ? "text" : "password"}
                      onChange={handleOtp}
                      error={errors.otp}
                      className="login-input-fields"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowOtp(!showOtp)}
                    >
                      <Image
                        src={showOtp ? visibleIcon : hideIcon}
                        alt={showOtp ? "Show" : "Hide"}
                      />
                    </button>
                  </div>
                  <div className="timer">
                    {time > 0 ? (
                      <span className="timer-text">
                        Resend in {formattedMinutes}:{formattedSeconds}
                      </span>
                    ) : (
                      <span className="resend-otp-text" onClick={handleSubmit}>Resend Otp</span>
                    )}
                  </div>

                  <div className="login-btn">
                    <CustomButton
                      text={"Verify"}
                      width={"-webkit-fill-available"}
                      onClick={() => {}}
                    />
                  </div>
                </form>
              </div>
            )}
          </>
        }
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </section>
  );
};

export default LoginContainer;
