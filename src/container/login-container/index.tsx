  "use client";
  import { FunctionComponent, useState, ChangeEvent, FormEvent } from "react";
  import Image from "next/image";
  import hideIcon from "@/public/icons/hide.png";
  import visibleIcon from "@/public/icons/visible.png";
  import WithLabelInputField from "@/components/input-field/withLabel-input";
  import CustomButton from "@/components/buttons";
  import Logo from "@/public/images/cms_logo.png";
  import "./style.css";
  import { useRouter } from "next/navigation";


  const LoginContainer: FunctionComponent = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
      {}
    );
    const [showPassword, setShowPassword] = useState(false);

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
        // Simulate a login check
        const isValidLogin =
          email === "admin@gmail.com" && password === "test1234";

        if (isValidLogin) {
          console.log("Logging in with", { email, password });
          router.push("/dashboard");
        } else {
          // Set errors based on which field is incorrect
          newErrors.email =
            email !== "admin@gmail.com" ? "Invalid email or password" : undefined;
          newErrors.password =
            password !== "test1234" ? "Invalid email or password" : undefined;

          setErrors(newErrors);
        }
      } else {
        setErrors(newErrors);
      }
    };

    return (
      <section className="login-main-container">
        <div className="area">
          <div className="login-center-container">
            <Image src={Logo} alt="Logo" width={100} />
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
                <CustomButton
                  text={"Login"}
                  width={"-webkit-fill-available"}
                  onClick={() => {}}
                />
              </div>
            </form>
          </div>
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
