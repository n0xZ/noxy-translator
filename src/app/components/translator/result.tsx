import { Result } from '~/types'
type Props = {
	result: Result
}
export default function TranslatorResult(props: Props) {
	return (
		<section className="w-full h-32 rounded-md shadow-sm">
			<h2>Translated: {props.result.data.translatedText}</h2>
		</section>
	)
}
