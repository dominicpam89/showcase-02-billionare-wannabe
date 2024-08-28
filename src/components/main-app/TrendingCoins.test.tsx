import { vi, it, describe, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import TrendingCoins from "./TrendingCoins";
import { Wrapper } from "@/lib/vitest.util";

// Mock the useContextCoinGecko hook and its return values
const mockUseContextCoinGecko = {
	coinGecko: {},
	useGetTrendingList: vi.fn().mockReturnValue({
		data: {
			coins: [{ id: 1, name: "Bitcoin", price: 45000 }],
			categories: [{ id: 1, name: "DeFi" }],
			nfts: [{ id: 1, name: "CryptoPunk" }],
		},
		isLoading: false,
		error: null,
		isError: false,
		isSuccess: true,
		isFetched: true,
	}),
};

vi.mock("@/lib/hooks/useCoinGecko", () => ({
	useContextCoinGecko: () => mockUseContextCoinGecko,
}));

// Mocking dependent components
vi.mock("./trending-coins/Coins", () => ({
	__esModule: true,
	default: () => <div>Mocked Coins Component</div>,
}));

vi.mock("./trending-coins/Categories", () => ({
	__esModule: true,
	default: () => <div>Mocked Categories Component</div>,
}));

vi.mock("./trending-coins/NFTS", () => ({
	__esModule: true,
	default: () => <div>Mocked NFTS Component</div>,
}));

vi.mock("../common/ErrorUI", () => ({
	__esModule: true,
	default: ({ title, message }: { title: string; message: string }) => (
		<div>
			<p>{title}</p>
			<p>{message}</p>
		</div>
	),
}));

const MockComponent = () => {
	return (
		<Wrapper
			contextValue={{
				coinGecko: mockUseContextCoinGecko.coinGecko,
				useGetTrendingList: mockUseContextCoinGecko.useGetTrendingList,
			}}
		>
			<TrendingCoins />
		</Wrapper>
	);
};

describe("TrendingCoins Component", () => {
	beforeEach(() => {
		render(<MockComponent />);
	});

	it("displays loading UI when data is being fetched", () => {
		mockUseContextCoinGecko.useGetTrendingList.mockReturnValueOnce({
			data: null,
			isLoading: true,
			error: null,
			isError: false,
			isSuccess: false,
			isFetched: false,
		});

		render(<MockComponent />);

		expect(screen.getByText(/temporary loading ui/i)).toBeVisible();
	});

	it("displays error UI when there is an error", () => {
		mockUseContextCoinGecko.useGetTrendingList.mockReturnValueOnce({
			data: null,
			isLoading: false,
			error: { message: "Network Error" },
			isError: true,
			isSuccess: false,
			isFetched: true,
		});

		render(<MockComponent />);

		expect(screen.getByText(/error fetching trending coins/i)).toBeVisible();
		expect(screen.getByText(/network error/i)).toBeVisible();
	});
});
