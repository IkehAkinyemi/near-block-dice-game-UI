import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import GameCard from "../../components/GameCard/GameCard";
import Navigator from "../../components/Navigator/Navigator";

const CompletedGames = ({ contract, currentUser }) => {
  const [completedGames, setCompletedGames] = useState([]);

  useEffect(() => {
    const getCompletedGames = async () => {
      try {
        const pages = await contract?.getCompletedGames({});
        return pages;
      } catch (err) {
        alert("Caught an error: " + err.message);
      }
    };

    getCompletedGames().then((res) => setCompletedGames(res?.data));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <header>Completed Games</header>
      <main className="my-20 mx-auto grid grid-cols-2 gap-10">
        {completedGames?.map((el) => {
          if(el.status === 2) {
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
								status={el.status}
								createdAt = {el.createdAt}
                variant = "completed"
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

export default CompletedGames;
