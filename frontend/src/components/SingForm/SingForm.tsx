import { FC, ChangeEvent} from 'react';
import { observer } from "mobx-react-lite";
import '../../styles/SignInForm.scss';
import { ISignFormProps } from '../../interfaces/ISignFormProps';
import emailImg from "../../img/email.svg";
import passwordImg from "../../img/password.svg";

const SignInForm: FC<ISignFormProps> = ({
    email,
    setEmail,
    password,
    setPassword,
    onLogin,
}) => {
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <form action="#" className="form-box">
            <div className="input-box">
                <label className="input-box__info" htmlFor="email">
                    Email
                </label>
                <label className="input-box__icon" htmlFor="email">
                    <img src={emailImg} alt="email" />
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="input-box">
                <label className="input-box__info" htmlFor="password">
                    Password
                </label>
                <label className="input-box__icon" htmlFor="password">
                    <img src={passwordImg} alt="password" />
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="btn-box">
                <button type="button" onClick={onLogin}>
                    Login
                </button>
            </div>
        </form>
    );
};

export default observer(SignInForm);
