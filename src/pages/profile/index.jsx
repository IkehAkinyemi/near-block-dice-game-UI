import styled from "styled-components";
import GameCard from "../../components/GameCard/GameCard";
import Navigator from "../../components/Navigator/Navigator";

const Profile = () => {
	return (
		<Wrapper>
			<header>Profile</header>
			<main className="my-20 mx-auto grid grid-cols-2 gap-10">
				<GameCard
					variant="completed"
					creator="melvinmanni.testnet"
					startDate="2/10/21 16:00"
					endDate="2/10/21 16:30"
					players={32}
					result="won"
					amount={1.6}
				/>
				<GameCard
					variant="completed"
					creator="melvinmanni.testnet"
					startDate="2/10/21 16:00"
					endDate="2/10/21 16:30"
					players={32}
					result="lost"
				/>
				<GameCard
					variant="completed"
					creator="melvinmanni.testnet"
					startDate="2/10/21 16:00"
					endDate="2/10/21 16:30"
					players={32}
				/>
				<GameCard
					variant="completed"
					creator="melvinmanni.testnet"
					startDate="2/10/21 16:00"
					endDate="2/10/21 16:30"
					players={32}
					result="lost"
				/>
			</main>
			<Navigator pageNum={1} next={false} prev={false} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
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

	& > main {
		max-width: 85%;

		h1 {
			font-weight: 800;
			font-size: 56px;
			line-height: 84px;
			letter-spacing: -0.03em;
			color: #1e1b1b;
		}
	}

	& > .bd-how {
		padding: 5rem 10rem 6rem;
		background: #e2e6e9;
	}
`;

export default Profile;
