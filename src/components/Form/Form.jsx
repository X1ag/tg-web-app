import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import './Form.css'

const Form = () => {
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [street, setStreet] = useState('')
	const [house, setHouse] = useState('')
	const [subject, setSubject] = useState('phis')
	const { tg } = useTelegram()
	const onSendData = useCallback(() => {
		const data = {
			country,
			city,
			street,
			house,
			subject
		}
		tg.sendData(JSON.stringify(data))
	}, [country, city,street,house,subject])

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData)
		return () => {
			tg.offEvent('mainButtonClicked', onSendData)
		}
	}, [])

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Отправить',
		})
	}, [])

	useEffect(() => {
		if (!street || !country || !city || !house) {
			tg.MainButton.hide()
		} else {
			tg.MainButton.show()
		}
	}, [country, street, city, house])

	const onChangeCountry = e => {
		setCountry(e.target.value)
	}
	const onChangeCity = e => {
		setCity(e.target.value)
	}
	const onChangeStreet = e => {
		setStreet(e.target.value)
	}
	const onChangeHouse = e => {
		setHouse(e.target.value)
	}
	const onChangeSubject = e => {
		setSubject(e.target.value)
	}

	return (
		<div className={'form'}>
			<h3>Введите данные</h3>
			<input
				type='text'
				placeholder={'Страна'}
				className={'input'}
				value={country}
				onChange={onChangeCountry}
			/>
			<input
				type='text'
				placeholder={'Город'}
				className={'input'}
				value={city}
				onChange={onChangeCity}
			/>
			<input
				type='text'
				placeholder={'Улица'}
				className={'input'}
				value={street}
				onChange={onChangeStreet}
			/>
			<input
				type='text'
				placeholder={'Дом'}
				className={'input'}
				value={house}
				onChange={onChangeHouse}
			/>
			<select className={'select'} value={subject} onChange={onChangeSubject}>
				<option value={'phis'}>Физ. лицо</option>
				<option value={'legal'}>Юр. лицо</option>
			</select>
		</div>
	)
}

export default Form
