import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Timer from "../Timer/Timer";

const GameCard = ({
	creator,
  startDate,
  endDate,
  players,
  result,
  variant,
  amount,
  contract,
  currentUser,
  id,
}) => {
  const [rolled, setRolled] = useState("Join Game");
  const [counter, setCounter] = useState(30.0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTIme] = useState(0);

  useEffect(() => {
		const countDown = () => {
			const timer = setInterval(() => {
				if (Date.now() / 1000 >= endTime || counter === "00.00") {
					setCounter("00:00");
				} else if (Date.now() / 1000 !== endTime) {
					const currentTime = endTime - Date.now() / 1000;
					setCounter(currentTime / 60 - 0.01);
				}
			}, 1000);
	
			return clearInterval(timer);
		}

    const getGameDetails = async () => {
      const playersDetails = await contract.getPlayersDetails({ gameId: id });
      const gameDetails = await contract.getGameDetails({ gameId: id });

      playersDetails.forEach((el) => {

        if (el.playerId === currentUser.accountId) {
          if (el.timeRolled !== "0") {
            setRolled("Rolled");
          } else {
            setRolled("Roll");
          }
        } else {
          setRolled("Join Game");
        }
      });

      if (gameDetails !== "0") {
        countDown();
      }
    };

    getGameDetails();
  }, [contract, id, currentUser.accountId, endTime, counter]);

  useEffect(() => {
    const getCreatedAt = async () => {
      const pages = await contract?.getCreatedGames({ page: 0 });
      // console.log(pages);
      pages?.data?.forEach((el) => {
        if (el.id === id) {
          let time = new Date(el.createdAt / 1000000);
          setStartTime(time.getTime() / 1000);
          setEndTIme(startTime + 1800);
        }
      });
    };
    getCreatedAt();
  }, [contract, id, startTime]);

  const handleClick = async () => {
		const countDown = () => {
			const timer = setInterval(() => {
				if (Date.now() / 1000 >= endTime || counter === "00.00") {
					setCounter("00:00");
				} else if (Date.now() / 1000 !== endTime) {
					const currentTime = endTime - Date.now() / 1000;
					setCounter(currentTime / 60 - 0.01);
				}
			}, 1000);
	
			return clearInterval(timer);
		}

    const playersDetails = await contract.getPlayersDetails({ gameId: id });
    try {
      playersDetails.forEach(async (el) => {
        if (el.playerId === currentUser.accountId) {
          await contract.rollDice({ gameId: id });
          setRolled("Rolled");
          countDown();
        } else {
          await contract.joinGame({ gameId: id });
          setRolled("Roll");
          countDown();
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderedButton = () => {
    if (variant === "completed") {
      return (
        <Button
          disabled={result !== "won"}
          variant={
            result === "lost" ? "red" : result === "won" ? "mint" : "disabled"
          }
        >
          {result === "lost"
            ? "Lost"
            : result === "won"
            ? "Claim Win"
            : "Claimed"}
        </Button>
      );
    }

    return (
      <Button
        disabled={rolled === "Rolled" ? true : false}
        variant={rolled === "Rolled" ? "disabled" : "mint"}
        onClick={handleClick}
      >
        {rolled}
      </Button>
    );
  };

  return (
    <Wrapper className="flex items-end justify-between px-8 py-6">
      <div>
        <h3 className="text-lg font-medium">Creator: {creator}</h3>
        <h3 className="text-lg font-medium my-3">Created At: {startDate}</h3>
        <h3 className="text-lg font-medium">Ends At: {endDate}</h3>
        <h3 className="text-lg font-medium mt-3 mb-6">Players: {players}</h3>
        {renderedButton()}
      </div>
      {variant !== "completed" ? (
        <Timer
          time={`${
            counter < 0 || counter === "00:00" ? "00:00" : counter?.toFixed(2)
          }`}
        />
      ) : (
        <div className="bd-amount rounded-full">
          <span className="inner-circle flex items-center justify-center rounded-full">
            {amount && (
              <>
                <Icon icon="near" /> <p className="font-bold ml-1">{amount}</p>
              </>
            )}
          </span>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 306px;
  width: 100%;
  max-width: 750px;
  background: linear-gradient(138.85deg, #ffffff -38.72%, #ffffff 153.95%);
  border: 12px solid rgba(225, 225, 225, 0.43);
  box-shadow: 0px 28px 118px rgba(109, 108, 115, 0.12);
  border-radius: 20px;
  & > .bd-amount {
    width: 86px;
    height: 86px;
    background: #161616;
    & .inner-circle {
      width: 80px;
      height: 80px;
      background: #f5f5f5;
      margin: 3px 0 0 4px;
    }
  }
`;

export default GameCard;