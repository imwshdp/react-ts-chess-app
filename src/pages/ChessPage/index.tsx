import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';

import BoxContainer from 'components/BoxContainer';
import Colors from 'resources/models/Colors';
import Player from 'resources/models/Player';
import Board from 'resources/models/Board';

import Timer from 'components/Timer';
import ChessBoard from 'components/ChessBoard';
import Button from 'components/Button/Button';
import Modal from 'components/Modal';

const ChessPage: React.FC = observer(() => {
	// store
	const store = useStore();
	const currentPlayer = store.currentPlayer;

	const [board, setBoard] = useState(new Board()); // game board state

	// players states
	const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
	const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));

	const currentPlayerBadge = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		restart();
	}, []);

	function restart() {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.addFigures();
		setBoard(newBoard);

		store.setCurrentPlayer(whitePlayer);
		store.restartGame();
		currentPlayerBadge?.current?.classList.remove('flipped');
	}

	function swapPlayer() {
		store.setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
	}

	const handleSubmit = (event: any) => {
		event.preventDefault();

		const form = event.target;
		const timeValue = form.setTime.value;
		const checkboxTimerChecked = form.timerSwitch.checked;
		const checkboxAIChecked = form.AISwitch.checked;

		if (checkboxAIChecked) {
			store.switchAiStatus(true);
		} else {
			store.switchAiStatus(false);
		}

		if (checkboxTimerChecked) {
			if (!timeValue || timeValue <= 0) return;
			store.setGameTime(+timeValue);
		} else {
			store.setGameTime(null);
		}
	};

	return (
		<main>
			<details>
				<summary>Настройка таймера</summary>
				<form className='settings-form' onSubmit={handleSubmit}>
					<input type='text' name='setTime' placeholder='Время в секундах' />

					<label>
						<input type='checkbox' name='timerSwitch'></input>
						Включить таймер
					</label>

					<label>
						<input type='checkbox' name='AISwitch'></input>
						Игра с ботом
					</label>

					<Button onSubmit={event => handleSubmit}>Применить настройки</Button>
				</form>
			</details>

			<ChessBoard board={board} setBoard={setBoard} swapPlayer={swapPlayer} currentPlayerBadge={currentPlayerBadge} />
			<Timer restart={restart} />

			<div>
				<h3>Побежденные фигуры</h3>
				<div className='lost-figures'>
					<BoxContainer title={'Чёрные'} figures={board.lostBlackFigures} />
					<BoxContainer title={'Белые'} figures={board.lostWhiteFigures} />
				</div>
			</div>

			<Modal />
		</main>
	);
});

export default ChessPage;
