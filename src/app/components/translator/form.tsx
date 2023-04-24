'use client'
import { FormEvent, useState } from 'react'
import { Result } from '~/types'
import { getLanguages } from '~/utils/languages'
import TranslatorResult from './result'

type TranslatorFields = {
	target_language: string
	text: string
}
type TranslateState = {
	loading: boolean
	result: Result
}
const TranslatorForm = () => {
	const [errors, setErrors] = useState<string>('')
	const [translateState, setTranslateState] = useState<TranslateState>(
		{} as TranslateState
	)
	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget as HTMLFormElement)
		const fields = Object.fromEntries(formData) as unknown as TranslatorFields
		if (!fields.text) setErrors('Campo requerido')
		else {
			setErrors('')
			setTranslateState({ ...translateState, loading: true })
			const API_URL = process.env.API_URL ?? ''
			const RAPIDAPI_HOST = process.env.RAPID_API_HOST ?? ''
			const RAPID_API_KEY = process.env.RAPID_API_KEY ?? ''
			const resp = await fetch(`${API_URL}/translate`, {
				method: 'POST',
				headers: {
					'X-RapidAPI-Host': RAPIDAPI_HOST,
					'X-RapidAPI-Key': RAPID_API_KEY,
				},
				body: new URLSearchParams({
					source_language: 'auto',
					target_language: fields.target_language,
					text: fields.text,
				}),
			})
			const data: Result = await resp.json()
			setTranslateState({ loading: false, result: data })
		}
	}
	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col items-center justify-center w-full max-w-2xl p-2 space-y-8 xl:p-0"
		>
		<h1 className='text-2xl font-semibold text-center'>Bienvenido a Noxy - abli!</h1>
			<aside className="flex flex-col justify-center w-full space-y-1">
				<label htmlFor="text" className="font-medium">
					Text to translate
				</label>
				<input
					type="text"
					name="text"
					placeholder="Je sui Gonzalo!"
					disabled={translateState.loading}
					className="w-full max-w-2xl p-3 rounded-md bg-emerald-50"
				/>
				<span className="h-6 text-red-500"> {errors ? errors : null}</span>
			</aside>

			<aside className="flex flex-col justify-center w-full space-y-3 ">
				<label htmlFor="target_language" className="font-medium">
					Target language
				</label>
				<select
					title="Language output"
					placeholder="en (English)"
					name="target_language"
					disabled={translateState.loading}
					className="w-full max-w-2xl p-3 rounded-md outline-none bg-emerald-50"
				>
					{getLanguages().map((l) => (
						<option value={l.code} key={l.code}>
							{l.code} ({l.name})
						</option>
					))}
				</select>
			</aside>
			<button
				type="submit"
				disabled={translateState.loading}
				className="w-full max-w-2xl p-3 font-medium text-white rounded-md outline-none bg-emerald-500"
			>
				{translateState.loading ? 'Loading...' : 'Translate text'}
			</button>
			{translateState.result && (
				<TranslatorResult result={translateState.result} />
			)}
		</form>
	)
}
export default TranslatorForm
