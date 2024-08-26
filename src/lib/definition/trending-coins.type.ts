type PriceChangePercentage24h = {
	aed: number;
	ars: number;
	aud: number;
	bch: number;
	bdt: number;
	bhd: number;
	bmd: number;
	bnb: number;
	brl: number;
	btc: number;
	cad: number;
	chf: number;
	clp: number;
	cny: number;
	czk: number;
	dkk: number;
	dot: number;
	eos: number;
	eth: number;
	eur: number;
	gbp: number;
	gel: number;
	hkd: number;
	huf: number;
	idr: number;
	ils: number;
	inr: number;
	jpy: number;
	krw: number;
	kwd: number;
	lkr: number;
	ltc: number;
	mmk: number;
	mxn: number;
	myr: number;
	ngn: number;
	nok: number;
	nzd: number;
	php: number;
	pkr: number;
	pln: number;
	rub: number;
	sar: number;
	sek: number;
	sgd: number;
	thb: number;
	try: number;
	twd: number;
	uah: number;
	usd: number;
	vef: number;
	vnd: number;
	xag: number;
	xau: number;
	xdr: number;
	xlm: number;
	xrp: number;
	yfi: number;
	zar: number;
	bits: number;
	link: number;
	sats: number;
};

type CoinData = {
	price: number;
	price_btc: string;
	price_change_percentage_24h: PriceChangePercentage24h;
	market_cap: string;
	market_cap_btc: string;
	total_volume: string;
	total_volume_btc: string;
	sparkline: string;
	content: null | {
		title: string;
		description: string;
	};
};

type CoinItem = {
	id: string;
	coin_id: number;
	name: string;
	symbol: string;
	market_cap_rank: number;
	thumb: string;
	small: string;
	large: string;
	slug: string;
	price_btc: number;
	score: number;
	data: CoinData;
};

type Coin = {
	item: CoinItem;
};

type NftData = {
	floor_price: string;
	floor_price_in_usd_24h_percentage_change: string;
	h24_volume: string;
	h24_average_sale_price: string;
	sparkline: string;
	content: null;
};

type Nft = {
	id: string;
	name: string;
	symbol: string;
	thumb: string;
	nft_contract_id: number;
	native_currency_symbol: string;
	floor_price_in_native_currency: number;
	floor_price_24h_percentage_change: number;
	data: NftData;
};

type MarketCapChangePercentage24h = {
	aed: number;
	ars: number;
	aud: number;
	bch: number;
	bdt: number;
	bhd: number;
	bmd: number;
	bnb: number;
	brl: number;
	btc: number;
	cad: number;
	chf: number;
	clp: number;
	cny: number;
	czk: number;
	dkk: number;
	dot: number;
	eos: number;
	eth: number;
	eur: number;
	gbp: number;
	gel: number;
	hkd: number;
	huf: number;
	idr: number;
	ils: number;
	inr: number;
	jpy: number;
	krw: number;
	kwd: number;
	lkr: number;
	ltc: number;
	mmk: number;
	mxn: number;
	myr: number;
	ngn: number;
	nok: number;
	nzd: number;
	php: number;
	pkr: number;
	pln: number;
	rub: number;
	sar: number;
	sek: number;
	sgd: number;
	thb: number;
	try: number;
	twd: number;
	uah: number;
	usd: number;
	vef: number;
	vnd: number;
	xag: number;
	xau: number;
	xdr: number;
	xlm: number;
	xrp: number;
	yfi: number;
	zar: number;
	bits: number;
	link: number;
	sats: number;
};

type CategoryData = {
	market_cap: number;
	market_cap_btc: number;
	total_volume: number;
	total_volume_btc: number;
	market_cap_change_percentage_24h: MarketCapChangePercentage24h;
	sparkline: string;
};

type Category = {
	id: number;
	name: string;
	market_cap_1h_change: number;
	slug: string;
	coins_count: number;
	data: CategoryData;
};

export type ApiResponse = {
	coins: Coin[];
	nfts: Nft[];
	categories: Category[];
};
