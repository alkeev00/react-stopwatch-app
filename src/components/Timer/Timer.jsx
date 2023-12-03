import React, { useEffect, useRef, useState } from 'react'
import style from './Timer.module.css'

function setDefaultValue() {
	const userTimer = localStorage.getItem('timer')
	return userTimer ? +userTimer : 0
}

const Timer = () => {
	const [timer, setTimer] = useState(setDefaultValue())
	const [isTimer, setIsTimer] = useState(false)
	const timerIdRef = useRef(null)

	const handleStart = () => {
		setIsTimer(true)
	}

	const handleStop = () => {
		setIsTimer(false)
	}

	const handleReset = () => {
		setIsTimer(false)
		setTimer(0)
	}

	useEffect(() => {
		localStorage.setItem('timer', timer)
	}, [timer])

	useEffect(() => {
		if (isTimer) {
			timerIdRef.current = setInterval(() => {
				setTimer(prevTimer => prevTimer + 1)
			}, 1000)
		}

		return () => {
			timerIdRef.current && clearInterval(timerIdRef.current)
			timerIdRef.current = null
		}
	}, [isTimer])

	return (
		<div className={style.timer__wrapper}>
			<h1 className={style.timer__title}>Stopwatch</h1>
			<span className={style.timer}>{timer}</span>
			{!isTimer ? (
				<button className={style.timer__btn} onClick={handleStart}>
					Start
				</button>
			) : (
				<button className={style.timer__btn} onClick={handleStop}>
					Stop
				</button>
			)}
			<button
				className={`${style.timer__btn} ${style.reset__btn}`}
				onClick={handleReset}
			>
				Reset
			</button>
		</div>
	)
}

export default Timer
