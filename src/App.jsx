import { useState } from "react";

function App() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtpInput, setshowOtpInput] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();


        setshowOtpInput(true);
    };

    return (
        <>
            <h1>Login page</h1>

            {showOtpInput ? (
                <OtpInputPage phoneNumber={phoneNumber} />
            ) : (
                <NumberInputPage
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    handleSubmit={handleSubmit}
                />
            )}
        </>
    );
}

const NumberInputPage = ({ phoneNumber, setPhoneNumber, handleSubmit }) => {
    return (
        <>
            <h2>Enter your phone number</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="number"></label>
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

const OtpInputPage = ({phoneNumber}) => {
    return (
        <>
        <h3>Opt sent to {phoneNumber}</h3>
            <form>
                <input type="number" name="" className="opt-input-box" />
                <input type="number" name="" className="opt-input-box" />
                <input type="number" name="" className="opt-input-box" />
                <input type="number" name="" className="opt-input-box" />
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
