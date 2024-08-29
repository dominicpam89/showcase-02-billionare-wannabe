declare type AuthFormType = "register" | "login" | "reset-password";
declare type AuthSwitchFormType = (formType: AuthFormType) => void;
declare type UserCurrency = "usd" | "idr" | "eur";
declare type MarketChartTimeFramesQuery = {
	monthly: string;
	daily: string;
	hourly: string;
};
