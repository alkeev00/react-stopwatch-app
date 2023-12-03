import style from './App.module.css'
import React from 'react'
import Timer from './components/Timer/Timer'

function App() {
	return (
		<div className={style.app}>
			<Timer />
		</div>
	)
}

export default App
