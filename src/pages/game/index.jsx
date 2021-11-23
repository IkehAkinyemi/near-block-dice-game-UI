import { useParams } from "react-router";
import styled from "styled-components";
import Button from "../../components/Button/Button";

const CompletedGames = () => {
	const { id } = useParams();

	const data = {
		creator: "melvinmanni.testnet",
		createdAt: "5/10/21  19:00",
	};

	return (
		<Wrapper>
			<header>GAME ID: {id}</header>
			<div className="bd-game-details relative">
				<div className="flex items-center justify-between">
					<h3 className="text-2xl font-semibold">Creator: {data?.creator}</h3>
					<h3 className="text-2xl font-semibold">Created: {data?.createdAt}</h3>
				</div>
				<div className="mt-8 flex items-center justify-between">
					<h3 className="text-2xl font-semibold">Creator: {data?.creator}</h3>
					<h3 className="text-2xl font-semibold">Creator: {data?.creator}</h3>
				</div>
				<div>
					<h3 className="text-2xl font-semibold mt-32 mb-3">Players:</h3>
					<p>melvinmanni.testnet</p>
					<p className="my-1">sheriff.testnet</p>
					<p>fortune.testnet</p>
					<p className="my-1">yemi.testnet</p>
					<p>...</p>
				</div>
				<div className="absolute bottom-6 w-10/12 flex flex-col items-center">
					<Button style={{ width: "max-content" }} variant="disabled" disabled>
						Claimed Win
					</Button>
				</div>
			</div>
			<footer className="h-20 mt-16" />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 2rem auto 0;

	& > header {
		max-width: 85%;
		margin: 2rem auto 8rem;
		padding: 1.8rem 0;
		text-align: center;
		background: #394149;
		color: #fff;
		font-weight: bold;
		font-size: 2rem;
		line-height: 140%;
		border: 14px solid #e3e3e3;
		border-radius: 8px;
	}

	& > .bd-game-details {
		max-width: 85%;
		margin: auto;
		height: 100%;
		width: 100%;
		padding: 3rem 5rem 10rem;
		background: linear-gradient(138.85deg, #ffffff -38.72%, #ffffff 153.95%);
		border: 12px solid rgba(225, 225, 225, 0.43);
		box-shadow: 0px 28px 118px rgba(109, 108, 115, 0.12);
		border-radius: 20px;
	}

	& > footer {
		background: #c4c4c4;
	}
`;

export default CompletedGames;
