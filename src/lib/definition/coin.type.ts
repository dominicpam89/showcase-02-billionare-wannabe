interface PlatformDetails {
	decimal_place: number;
	contract_address: string;
}

interface Platforms {
	[platformName: string]: string;
}

interface DetailPlatforms {
	[platformName: string]: PlatformDetails;
}

interface Localization {
	[languageCode: string]: string;
}

interface Image {
	thumb: string;
	small: string;
	large: string;
}

interface MarketData {
	current_price: { [currency: string]: number };
	total_value_locked: number | null;
	mcap_to_tvl_ratio: number | null;
	fdv_to_tvl_ratio: number | null;
	roi: number | null;
	ath: { [currency: string]: number };
	ath_change_percentage: { [currency: string]: number };
	ath_date: { [currency: string]: string };
	atl: { [currency: string]: number };
	atl_change_percentage: { [currency: string]: number };
	atl_date: { [currency: string]: string };
	market_cap: { [currency: string]: number };
	market_cap_rank: number;
	fully_diluted_valuation: { [currency: string]: number };
	market_cap_fdv_ratio: number;
	total_volume: { [currency: string]: number };
	high_24h: { [currency: string]: number };
	low_24h: { [currency: string]: number };
	price_change_24h: number;
	price_change_percentage_24h: number;
	price_change_percentage_7d: number;
	price_change_percentage_14d: number;
	price_change_percentage_30d: number;
	price_change_percentage_60d: number;
	price_change_percentage_200d: number;
	price_change_percentage_1y: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	price_change_24h_in_currency: { [currency: string]: number };
	price_change_percentage_1h_in_currency: { [currency: string]: number };
	price_change_percentage_24h_in_currency: { [currency: string]: number };
	price_change_percentage_7d_in_currency: { [currency: string]: number };
	price_change_percentage_14d_in_currency: { [currency: string]: number };
	price_change_percentage_30d_in_currency: { [currency: string]: number };
	price_change_percentage_60d_in_currency: { [currency: string]: number };
	price_change_percentage_200d_in_currency: { [currency: string]: number };
	price_change_percentage_1y_in_currency: { [currency: string]: number };
	market_cap_change_24h_in_currency: { [currency: string]: number };
	market_cap_change_percentage_24h_in_currency: { [currency: string]: number };
	total_supply: number;
	max_supply: number;
	circulating_supply: number;
	last_updated: string;
}

interface CommunityData {
	facebook_likes: number | null;
	twitter_followers: number;
	reddit_average_posts_48h: number;
	reddit_average_comments_48h: number;
	reddit_subscribers: number;
	reddit_accounts_active_48h: number;
	telegram_channel_user_count: number;
}

interface DeveloperData {
	forks: number;
	stars: number;
	subscribers: number;
	total_issues: number;
	closed_issues: number;
	pull_requests_merged: number;
	pull_request_contributors: number;
	code_additions_deletions_4_weeks: {
		additions: number | null;
		deletions: number | null;
	};
	commit_count_4_weeks: number;
	last_4_weeks_commit_activity_series: number[];
}

interface TickerMarket {
	name: string;
	identifier: string;
	has_trading_incentive: boolean;
}

interface TickerConverted {
	btc: number;
	eth: number;
	usd: number;
}

interface Ticker {
	base: string;
	target: string;
	market: TickerMarket;
	last: number;
	volume: number;
	converted_last: TickerConverted;
	converted_volume: TickerConverted;
	trust_score: string;
	bid_ask_spread_percentage: number;
	timestamp: string;
	last_traded_at: string;
	last_fetch_at: string;
	is_anomaly: boolean;
	is_stale: boolean;
	trade_url: string;
	token_info_url: string | null;
	coin_id: string;
	target_coin_id: string;
}

export type ApiResponseCoinType = {
	id: string;
	symbol: string;
	name: string;
	web_slug: string;
	asset_platform_id: string;
	platforms: Platforms;
	detail_platforms: DetailPlatforms;
	block_time_in_minutes: number;
	hashing_algorithm: string | null;
	categories: string[];
	preview_listing: boolean;
	public_notice: string | null;
	additional_notices: string[];
	localization: Localization;
	description: Localization;
	links: {
		homepage: string[];
		whitepaper: string;
		blockchain_site: string[];
		official_forum_url: string[];
		chat_url: string[];
		announcement_url: string[];
		twitter_screen_name: string;
		facebook_username: string;
		bitcointalk_thread_identifier: string | null;
		telegram_channel_identifier: string;
		subreddit_url: string;
		repos_url: {
			github: string[];
			bitbucket: string[];
		};
	};
	image: Image;
	country_origin: string;
	genesis_date: string | null;
	contract_address: string;
	sentiment_votes_up_percentage: number;
	sentiment_votes_down_percentage: number;
	watchlist_portfolio_users: number;
	market_cap_rank: number;
	market_data: MarketData;
	community_data: CommunityData;
	developer_data: DeveloperData;
	status_updates: any[];
	last_updated: string;
	tickers: Ticker[];
};
