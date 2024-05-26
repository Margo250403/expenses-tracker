import {Dispatch, SetStateAction } from 'react';

export interface ISignFormProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    onLogin: () => Promise<void>;
    onRegister: () => Promise<void>;
}
