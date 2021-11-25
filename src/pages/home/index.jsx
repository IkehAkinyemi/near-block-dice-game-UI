import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
	addToGameList,
  selectGameListState,
} from "../../store/slices/gameList.slice";
import Big from "big.js";

const txFee = Big(0.5)
  .times(10 ** 24)
  .toFixed();
const GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const Home = ({ contract, currentUser }) => {
  const [gameId, setGameId] = useState("");
	const [homeBtn, setHomeBtn] = useState("Create A Game")
  console.log(currentUser);

  const gameList = useSelector(selectGameListState);
  const dispatch = useDispatch();

  console.log(gameList);

  const createNewGame = async () => {
    try {
      return await contract.createNewGame({}, GAS, txFee);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <section className="bd-intro mx-auto flex items-center justify-between">
        <article className="w-1/2">
          <h1>
            Enjoy Having Fun ? <br /> Join The <br /> Block Dice Game
          </h1>
          <Button
            style={{ height: 55 }}
            className="my-8"
            onClick={() => {
							setHomeBtn("Loading...");

              createNewGame().then((val) => {
                dispatch(addToGameList(val));
								setHomeBtn("Create A Game")
              });
            }}
          >
            {homeBtn}
          </Button>
          <Link to="/">How it works ?</Link>
        </article>
        <article className="w-1/2">
          <Icon size={650} className="-ml-10" icon="header" />
        </article>
      </section>
      <section className="bd-how py-12 flex items-center justify-between">
        <article className="w-1/2">
          <h2 className="text-3xl font-bold">How Does It Work?</h2>
          <div className="flex mt-8">
            <span>
              <Icon
                className="bg-white rounded-full h-16 w-16 flex items-center mr-6 justify-center"
                icon="create"
              />
            </span>
            <div>
              <h3 className="font-bold text-xl mb-2">Create Game</h3>
              <p>
                Create a new game and get a game ID that allows others join your
                game. Creating a game cost 0.5 NEAR token staked in the game.
                Each game last for 30 minutes
              </p>
            </div>
          </div>
          <div className="flex mt-8">
            <span>
              <Icon
                className="bg-white rounded-full h-16 w-16 flex items-center mr-6 justify-center"
                icon="join"
              />
            </span>
            <div>
              <h3 className="font-bold text-xl mb-2">Join Game</h3>
              <p>
                You can join a game using the game ID or from the active game
                explorer. You need to stake 0.5 NEAR token in a game to join.
              </p>
            </div>
          </div>
          <div className="flex mt-8">
            <span>
              <Icon
                className="bg-white rounded-full h-16 w-16 flex items-center mr-6 justify-center"
                icon="dice"
              />
            </span>
            <div>
              <h3 className="font-bold text-xl mb-2">Roll and Calculate</h3>
              <p>
                You can roll within a games active time.The number rolled is
                recorded and stored on the blockchain.
              </p>
            </div>
          </div>
          <div className="flex mt-8">
            <span>
              <Icon
                className="bg-white rounded-full h-16 w-16 flex items-center mr-6 justify-center"
                icon="winning"
              />
            </span>
            <div>
              <h3 className="font-bold text-xl mb-2">Winning</h3>
              <p>
                The highest roll per game gets rewarded with the fees for
                entering a game.
              </p>
            </div>
          </div>
          <div className="relative mt-16">
            <Link
              className="flex hover:underline absolute -right-24"
              to="/active-games"
            >
              <p>View Games</p> <Icon className="ml-4" icon="arrow" />
            </Link>
          </div>
        </article>
        <article className="ml-32 w-1/2">
          <h2 className="text-3xl text-center font-bold mb-16">
            Join Active Game
          </h2>
          <form className="w-full flex flex-col items-center">
            <Input
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Enter Game ID"
            />
            <Button style={{ height: 55 }} className="mt-12 w-max">
              Join Game
            </Button>
          </form>
        </article>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > .bd-intro {
    max-width: 75%;
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

export default Home;