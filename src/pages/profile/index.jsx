import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import GameCard from "../../components/GameCard/GameCard";
import Navigator from "../../components/Navigator/Navigator";

const Profile = ({contract, currentUser}) => {

	const [games, setGames] = useState([]);

	useEffect(() => {
		const getProfile = async () => {
			const profile = await contract?.getProfileDetails({account: currentUser?.accountId});

			profile.forEach( async (el) => {
				const data = await contract?.getGameDetails({gameId: el});
				setGames(prev => [data[0], ...prev]);
			});
		}

		getProfile();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) 

	console.log(games);

	return (
		<Wrapper>
			<header>Profile</header>
			<main className="my-20 mx-auto grid grid-cols-2 gap-10">
			{games?.map((el) => {
				if(el) {
					return (
						<GameCard
							key={el.id}
							id={el.id}
							creator={el.createdBy}
							startDate={`${new Date(el.createdAt / 1000000)}`.substring(0, 24)}
							endDate={`${new Date((el.createdAt / 1000000) + (1800000))}`.substring(0, 24)}
							players={el.players}
							contract={contract}
							currentUser={currentUser}
							createdAt = {el.createdAt}
							status={el.status}
							variant={el.status !== 2 ? null : "completed"}
							amount={1.6}
						/>
					)
				}

				return null;
			})}
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
