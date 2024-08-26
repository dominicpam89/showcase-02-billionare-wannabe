declare type AuthFormType = "register" | "login" | "reset-password";
declare type AuthSwitchFormType = (formType: AuthFormType) => void;
