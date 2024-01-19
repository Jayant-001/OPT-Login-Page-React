import { useEffect, useRef, useState } from "react";

function App() {
    const [phoneNumber, setPhoneNumber] = useState("");
    // show otp input page if number is filled
    const [showOtpInput, setshowOtpInput] = useState(false);

    // length of otp fields
    const length = 4;

    const handleNumberSubmit = () => {
        // validate phone number

        // if number is valid show OTP input fileds
        setshowOtpInput(true);
    };

    const handleOtpSubmit = (otp) => {
        // handle OTP validation
        console.log(otp);
    };

    return (
        <>
            <h1>Login page</h1>

            {showOtpInput ? (
                // to make OptInputPage resuable pass length as parameter
                <OtpInputPage
                    handleSubmit={handleOtpSubmit}
                    phoneNumber={phoneNumber}
                    length={length}
                />
            ) : (
                <NumberInputPage
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    handleSubmit={handleNumberSubmit}
                />
            )}
        </>
    );
}

// Component to take phone number input
const NumberInputPage = ({ phoneNumber, setPhoneNumber, handleSubmit }) => {
    return (
        <>
            <h2>Enter your phone number</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <label htmlFor="number">Number</label>
                <input
                    type="number"
                    name="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id="number"
                />
                <input type="submit" value="Continue" />
            </form>
        </>
    );
};

const OtpInputPage = ({ phoneNumber, length, handleSubmit }) => {
    // length define the number of fileds in OTP
    // create an opt array to store individual digit
    const [otp, setOtp] = useState(new Array(length).fill(""));

    // reference of all input fields
    const inputRefs = useRef([]);

    // handle input change in otp fields
    const handleChange = (event, idx) => {
        let value = event.target.value; // grab the current input value

        if (isNaN(value)) return; // input must be a number

        const updatedOtp = [...otp];
        // allow only one digit input || take only last digit of the input
        updatedOtp[idx] = value.substring(value.length - 1);

        setOtp(updatedOtp);

        // trigger submit function
        // `setOtp` is asynchronous thats why here we will use `updatedOtp`
        const combineOtp = updatedOtp.join(""); // convert otp array into a string
        // submit the OTP if all input fields are filled
        if (combineOtp.length === 4) {
            handleSubmit(combineOtp);
        }

        // move to next empty input field if current field is filled
        if (value && idx < length - 1 && inputRefs.current[idx + 1]) {
            inputRefs.current[updatedOtp.indexOf("")].focus();
        }
    };

    useEffect(() => {
        // check if input inputRefs are initialise
        if (inputRefs.current[0]) {
            // on component load => focus on the 1st input field
            inputRefs.current[0].focus();
        }
    }, []);

    // handle click on input field
    const handleClick = (idx) => {
        // move the input cursor at last
        inputRefs.current[idx].setSelectionRange(1, 1);

        // check if previous field is empty
        // move focus to the first empty field
        if (idx > 0 && !otp[idx - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (event, idx) => {
        // move focus to previous input field on pressing Backspace
        if (
            event.key === "Backspace" &&
            !otp[idx] && // if current field is empty
            idx > 0 &&
            inputRefs.current[idx - 1]
        ) {
            inputRefs.current[idx - 1].focus();
        }
    };

    return (
        <>
            <h3>Opt sent to {phoneNumber}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // auto submit when all fields are filled
                }}
            >
                {otp.map((value, idx) => (
                    <input
                        type="text"
                        key={idx}
                        ref={(input) => (inputRefs.current[idx] = input)} // set the reference
                        value={value}
                        onChange={(e) => handleChange(e, idx)}
                        onClick={() => handleClick(idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        className="opt-input-box"
                    />
                ))}
                <br />
                <input
                    style={{ margin: "auto", border: "1px solid blue" }}
                    type="submit"
                    value="Submit"
                />
            </form>
        </>
    );
};

export default App;
